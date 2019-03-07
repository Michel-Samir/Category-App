import { NgModule } from '@angular/core';
import { 
    MatToolbarModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule} from '@angular/material';

@NgModule({
    exports: [
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatBottomSheetModule,
        MatExpansionModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatCheckboxModule
    ]
})
export class MaterialModule {

}