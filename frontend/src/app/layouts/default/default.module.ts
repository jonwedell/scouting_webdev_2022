import { WordCloudComponent } from './../../modules/word-cloud/word-cloud.component';
import { TeamGraphComponent } from './../../modules/team-graph/team-graph.component';
import { TeamTableComponent } from './../../modules/team-table/team-table.component';
import { AnalysisTableComponent } from './../../modules/analysis-table/analysis-table.component';
import { SharedModule } from './../../shared/shared.module';
import { HomeComponent } from './../../modules/home/home.component';
import { RouterModule } from '@angular/router';
import { MatchComponent } from './../../modules/match/match.component';
import { RobotComponent } from './../../modules/robot/robot.component';
import { DefaultComponent } from './default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { AnalysisComponent } from 'src/app/modules/analysis/analysis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { AnalysisGraphComponent } from 'src/app/modules/analysis-graph/analysis-graph.component';
import { PitDataComponent } from 'src/app/modules/pit-data/pit-data.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    DefaultComponent,
    RobotComponent,
    MatchComponent,
    HomeComponent,
    AnalysisComponent,
    AnalysisTableComponent,
    TeamTableComponent,
    TeamGraphComponent,
    AnalysisGraphComponent,
    PitDataComponent,
    WordCloudComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PlotlyModule
  ],
  providers: [
    HttpClientModule,
    ApiService
  ]
})
export class DefaultModule { }
