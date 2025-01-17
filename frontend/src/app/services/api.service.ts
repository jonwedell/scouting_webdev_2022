import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {F} from "@angular/cdk/keycodes";
import { formatDate } from '@angular/common';


export class Final24 {
  Team: String;

  constructor() {
    this.Team = '';
  }
}

export interface CEA {
  Team: string;
  AnalysisType: string;
  AnalysisTypeID: number;
  EventID: number;
  Match1Display: string;
  Match1Format: number;
  Match1Value: number;
  Match2Display: string;
  Match2Format: number;
  Match2Value: number;
  Match3Display: string;
  Match3Format: number;
  Match3Value: number;
  Match4Display: string;
  Match4Format: Number;
  Match4Value: number;
  Match5Display: string;
  Match5Format: number;
  Match5Value: number;
  Match6Display: string;
  Match6Format: number;
  Match6Value: number;
  Match7Display: string;
  Match7Format: number;
  Match7Value: number;
  Match8Display: string;
  Match8Format: number;
  Match8Value: number;
  Match9Display: string;
  Match9Format: number;
  Match9Value: number;
  Match10Display: string;
  Match10Format: number;
  Match10Value: number;
  Match11Display: string;
  Match11Format: number;
  Match11Value: number;
  Match12Display: string;
  Match12Format: number;
  Match12Value: number;
  Summary1Display: string;
  Summary1Format: number;
  Summary1Value: number;
  Summary2Display: string;
  Summary2Format: number;
  Summary2Value: number;
  Summary3Display: string;
  Summary3Format: number;
  Summary3Value: number;
  Summary4Display: string;
  Summary4Format: number;
  Summary4Value: number;
  Maximum: number;
  Minimum: number;
  Percent: number;
}

export interface Matches {
  BlueTeam1: string;
  BlueTeam2: string;
  BlueTeam3: string;
  MatchNo: number;
  RedTeam1: string;
  RedTeam2: string;
  RedTeam3: string;
}

export interface Teams {
  AutoHuman: Number;
  AutoPickUp: Number;
  AutoScoredHigh: Number;
  AutoScoredLow: Number;
  AutoStartPosID: Number;
  AutoSummary: String;
  CanClimb: Number;
  ClimbHeightID: Number;
  ClimbPosition: Number;
  ClimbStrategy: String;
  ClimbTime: Number;
  DriveType: String;
  DriveTypeID: Number;
  GearRatio: String;
  HasAuto: Number;
  IntakeType: Number;
  LanguageID: Number;
  LanguageType: String;
  MaxBallCapacity: Number;
  MotorType: String;
  MotorTypeID: Number;
  MoveBonus: Number;
  NumDriveMotors: Number;
  NumGearSpeed: Number;
  NumWheels: Number;
  Pneumatics: Number;
  Preload: Number;
  RobotHeight: Number;
  RobotLength: Number;
  RobotWeight: Number;
  RobotWidth: Number;
  Speed: Number;
  Team: Number;
  TeamCity: String;
  TeamCountry: String;
  TeamLocation: String;
  TeamName: String;
  TeamStateProv: String;
  TeleBallsScoredHigh: Number;
  TeleBallsScoredLow: Number
  TeleDefense: Number;
  TeleDefenseEvade: Number;
  TeleDefenseStrat: String;
  TeleShootWhileDrive: Number;
  TeleSortCargo: Number;
  TeleStrategy: String;
  WheelType: String;
  WheelTypeID: Number;
}

export interface CurrTeams {
  team: Number;
}

export interface Summary {
  AutonomousMean: Number;
  AutonomousMedian: Number;
  AutonomousScoreMean: Number;
  AutonomousScoreMedian: Number;
  ClimbMean: Number;
  ClimbMedian: Number;
  EventID: Number;
  Team: String;
  TeleBallScoreMean: Number;
  TeleBallScoreMedian: Number;
  TeleHighBallsMean: Number;
  TeleHighBallsMedian: Number;
  TeleLowBallsMean: Number;
  TeleLolBallsMedian: Number;
  TeleTotalBallsMean: Number;
  TeleTotalBallsMedian: Number;
  TotalBallsMean: Number;
  TotalBallsMedian: Number;
  TotalSCoreMean: Number;
  TotalScoreMedian: Number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public CEAReplay: ReplaySubject<CEA[]>;
  public MatchReplay: ReplaySubject<Matches[]>;
  public TeamsReplay: ReplaySubject<Teams[]>;
  public CurrTeamReplay: ReplaySubject<CurrTeams[]>;
  public SummaryReplay: ReplaySubject<Summary[]>;

  private apiUrl = 'http://localhost:5000';
  //private apiUrl = 'http://10.0.9.92:5000';
  //private apiUrl = 'http://192.168.1.195:23450';  // Dave's House
  //private apiUrl = 'http://10.0.0.195:23450';     // Mark's House
  //private apiUrl = 'https://8zaof0vuah.execute-api.us-east-1.amazonaws.com';  // AWS Test
  //private apiUrl = 'https://8zaof0vuah.execute-api.us-east-1.amazonaws.com/prod/';  // AWS Alternate

  constructor(private http: HttpClient) {
    this.CEAReplay = new ReplaySubject(1);
    this.MatchReplay = new ReplaySubject(1);
    this.TeamsReplay = new ReplaySubject(1);
    this.CurrTeamReplay = new ReplaySubject(1);
    this.SummaryReplay = new ReplaySubject(1);

    // Automatically load the data once when the application starts
    this.loadData();
  }

  // This loads the data on service initialization, and then makes the data
  //  available as a ReplaySubject.
  loadData(): void {

    // First try to load a fresh copy of the data from the API
    this.http.get<CEA[]>(this.apiUrl + '/analysis').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CEAReplay.next(response as CEA[]);
      // Might as well store it while we have it
      console.log("Getting Data from Database");

      let now = new Date();
      let date = formatDate(now, 'MM/dd hh:mm a', 'en-US');
      localStorage.setItem('lastDB', date);
      console.log("Time: " + date);

      localStorage.setItem('CEA', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        console.log("Getting Data from Cache");
        this.CEAReplay.next(JSON.parse(localStorage.getItem('CEA')!) as CEA[]);
      } catch (err) {
        console.error('Could not load Analysis data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Matches[]>(this.apiUrl + '/matches').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.MatchReplay.next(response as Matches[]);
      // Might as well store it while we have it
      localStorage.setItem('Matches', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.MatchReplay.next(JSON.parse(localStorage.getItem('Matches')!) as Matches[]);
      } catch (err) {
        console.error('Could not load Matches data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<CurrTeams[]>(this.apiUrl + '/currteam').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.CurrTeamReplay.next(response as CurrTeams[]);
      // Might as well store it while we have it
      localStorage.setItem('CurrTeams', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.CurrTeamReplay.next(JSON.parse(localStorage.getItem('CurrTeams')!) as CurrTeams[]);
      } catch (err) {
        console.error('Could not load Current Teams data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Summary[]>(this.apiUrl + '/summary').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.SummaryReplay.next(response as Summary[]);
      // Might as well store it while we have it
      localStorage.setItem('Summary', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.SummaryReplay.next(JSON.parse(localStorage.getItem('Summary')!) as Summary[]);
      } catch (err) {
        console.error('Could not load Summary data from server or cache!');
      }
    });

    // First try to load a fresh copy of the data from the API
    this.http.get<Teams[]>(this.apiUrl + '/pitdata').subscribe(response => {
      // Store the response in the ReplaySubject, which components can use to access the data
      this.TeamsReplay.next(response as Teams[]);
      // Might as well store it while we have it
      localStorage.setItem('Teams', JSON.stringify(response));
    }, () => {
      try {
        // Send the cached data
        this.TeamsReplay.next(JSON.parse(localStorage.getItem('Teams')!) as Teams[]);
      } catch (err) {
        console.error('Could not load Teams data from server or cache!');
      }
    });
  }


  async getFinal24(): Promise<Final24[]> {
    // First try to load a fresh copy of the data from the API

    // First try to load a fresh copy of the data from the API
    try {
      const response = await this.http.get<Final24[]>(this.apiUrl + '/final24').toPromise();
      localStorage.setItem('Final24', JSON.stringify(response));
      return response as Final24[];
    } catch (e) {
      try {
        // Send the cached data
        return JSON.parse(localStorage.getItem('Final24')!) as Final24[];
      } catch (err) {
        console.error('Could not load Final24 data from server or cache!');
        return [];
      }
    }
  }

  saveFinal24(final24: Final24[]){
    localStorage.setItem('Final24', JSON.stringify(final24));

    const options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    this.http.post<Final24[]>(this.apiUrl + '/final24', JSON.stringify(final24), options).subscribe();

    console.log("Data: ", final24);
    const len = JSON.stringify(final24)?.length;
    console.log("Length: "+ len);

  }
}
