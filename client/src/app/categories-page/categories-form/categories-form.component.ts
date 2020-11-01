import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef
  form: FormGroup
  image: File
  imagePreview = ''
  isNew = true
  category: Category

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService,
    private router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.form.disable()

    this.route.params
  .pipe(
    switchMap(
      (params: Params) => {
        if (params['id']) {
          this.isNew = false
          return this.categoriesService.getById(params['id'])
        }

        return of(null)
      }
    )
  )
  .subscribe(
    (category: Category) => {
      if (category) {
        const itemId = this.route.snapshot.params['id'];
        const neededCategory = category.filter( e => e._id === itemId)
        this.category = neededCategory[0]
        this.form.patchValue({
          name: neededCategory[0].name
        })
        this.imagePreview = neededCategory[0].imageSrc
        MaterialService.updateTextInput()
      }

      this.form.enable()
    },
    error => MaterialService.toast(error.error.message)
  )
}

deleteCategory(){
  const decision = window.confirm(`Вы уверены, что хотите удалить категорию "${this.category.name}"`)

  if(decision){
    this.categoriesService.delete(this.category._id)
    .subscribe(
      response => MaterialService.toast(response.message),
      error => MaterialService.toast(error.error.message),
      () => this.router.navigate(['/categories'])
    )
  }
}

  triggerClick(){
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result as string
    }

reader.readAsDataURL(file)

  }

  onSubmit() {
    let obs$: Observable<Category>
    this.form.disable()

    if(this.isNew){
      //create
     obs$ = this.categoriesService.create(this.form.value.name, this.image)
    } else {
      //update
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image)
    }
    obs$.subscribe( (category: Category) => {
      this.category = category
      MaterialService.toast("Изменения сохранены")
      this.form.enable()
    },
      (    error: { error: { message: string; }; }) => {
      MaterialService.toast(error.error.message)
      this.form.enable()
    }

    );

  }

}
