import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./../material.module";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [],
  imports: [FormsModule, MaterialModule, FlexLayoutModule, CommonModule],
  exports: [FormsModule, MaterialModule, FlexLayoutModule, CommonModule],
})
export class SharedModule {}
