import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CinemaService} from "../services/cinema.service";

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
    public villes;
    public cinemas;
    public currentVille;
    public currentCinema;
  private salles: any;
  constructor(public cinemaService:CinemaService) { }

  ngOnInit() {
    this.cinemaService.getVilles()
      .subscribe(data=>{
          this.villes=data;
      }, err=>{
        console.log(err);
      })
  }

  onGetCinemas(v: any) {
    this.currentVille=v;
    this.cinemaService.getCinemas(v)
      .subscribe(data=>{
        this.cinemas=data;
      }, err=>{
        console.log(err);
      })
  }

  onGetSalles(c: any) {
    this.currentCinema=c;
    this.cinemaService.getSalles(c)
      .subscribe(data=>{
        this.salles=data;
        this.salles._embedded.salles.forEach(salle=>{
          this.cinemaService.getProjection(salle)
            .subscribe(data=>{
              salle.projection=data;
            }, err=>{
              console.log(err);
            })
        });
      }, err=>{
        console.log(err);
      })
  }
}
