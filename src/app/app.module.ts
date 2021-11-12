import { LabFooterComponent } from './components/layout/lab-footer/lab-footer.component';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiNotificationsModule,
  TUI_SANITIZER,
  TuiButtonModule,
  TuiThemeNightModule,
  TuiModeModule,
  TuiSvgModule,
  TuiColorModule,
  TuiFormatNumberPipeModule,
  TuiFormatPhonePipeModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisModule } from 'ngx-vis';
import {
  TuiFilterPipeModule,
  TuiFocusableModule,
  TuiMapperPipeModule,
  TuiPortalHostModule,
} from '@taiga-ui/cdk';
import { TuiDocNavigationModule } from '@taiga-ui/addon-doc';
import {
  TuiAvatarModule,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiTabsModule,
  TuiToggleModule,
  TuiSelectModule,
  TuiDataListWrapperModule,
  TuiFilterByInputPipeModule,
  TuiCheckboxBlockModule,
  TuiInputModule,
  TuiComboBoxModule,
  TuiStringifyPipeModule,
  TuiTagModule,
  TuiRadioBlockModule,
} from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageAboutNodeComponent } from './pages/page-about-node/page-about-node.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { RouterModule } from '@angular/router';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { HttpClientModule } from '@angular/common/http';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiDataListModule } from '@taiga-ui/core';
import { PageContributeComponent } from './pages/page-contribute/page-contribute.component';
import { NodifyPipe } from './pipes/nodify-pipe/nodify.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { LabHeaderComponent } from './components/layout/lab-header/lab-header.component';
import { LabAboutComponent } from './components/layout/lab-about/lab-about.component';
import { LabLatestComponent } from './components/layout/lab-latest/lab-latest.component';
import { LatestCardComponent } from './components/tag/latest-card/latest-card.component';
import { AboutCardComponent } from './components/tag/about-card/about-card.component';
import { ActorFormComponent } from './components/tag/forms/actor-form/actor-form.component';
import { ProjectFormComponent } from './components/tag/forms/project-form/project-form.component';
import { TechnologyFormComponent } from './components/tag/forms/technology-form/technology-form.component';
import { PageDataComponent } from './pages/page-data/page-data.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';
import {TuiLoaderModule} from '@taiga-ui/core';
@NgModule({
  declarations: [
    AppComponent,
    LabFooterComponent,
    LabHeaderComponent,
    LabAboutComponent,
    LabLatestComponent,
    LatestCardComponent,
    AboutCardComponent,
    PageAboutNodeComponent,
    PageHomeComponent,
    PageDataComponent,
    PageContributeComponent,
    NodifyPipe,
    ActorFormComponent,
    ProjectFormComponent,
    TechnologyFormComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    VisModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiNotificationsModule,
    TuiPortalHostModule,
    TuiButtonModule,
    TuiFocusableModule,
    TuiDocNavigationModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiThemeNightModule,
    TuiRootModule,
    TuiToggleModule,
    FormsModule,
    TuiIslandModule,
    FlexLayoutModule,
    TuiMarkerIconModule,
    TuiSvgModule,
    FontAwesomeModule,
    TuiTabsModule,
    TuiColorModule,
    TuiAvatarModule,
    ScrollToModule.forRoot(),
    HttpClientModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    ReactiveFormsModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiInputModule,
    TuiComboBoxModule,
    TuiStringifyPipeModule,
    FormsModule,
    TuiDataListWrapperModule,
    TuiFilterPipeModule,
    TuiFormatNumberPipeModule,
    TuiFormatPhonePipeModule,
    TuiMapperPipeModule,
    TuiFilterByInputPipeModule,
    TuiCheckboxBlockModule,
    NgSelectModule,
    TuiTagModule,
    TuiRadioBlockModule,
    TuiScrollbarModule,
    SocialLoginModule,
    TuiLoaderModule
  ],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '291617403064-jko8k38298frjc4f56ajirtf83ag9jug.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
