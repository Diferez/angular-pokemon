import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
  ],
  exports: [MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
  ],
})
export class MaterialModule { }
