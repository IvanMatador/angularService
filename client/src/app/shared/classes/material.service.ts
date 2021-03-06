import { ElementRef } from '@angular/core'

declare var M

export interface MaterialInstance{
  open?(): void
  close?(): void
  destroy?(): void
}

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initializeFloatingButton(ref: ElementRef){
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInput() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef){
    return M.Modal.init(ref.nativeElement)
  }

}


