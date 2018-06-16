import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatListModule,
    MatIconModule,
  ],
})
export class MaterialImportModule {
}
