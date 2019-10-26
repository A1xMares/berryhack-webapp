import { Injectable} from '@angular/core';
import { HttpClient,  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://api.thingspeak.com/channels/895281/feeds.json?api_key=RIXNO1S0FISMWAP2';

  public currentUserValue = {};

  constructor(
      private http: HttpClient
  ) { }

  getDataObjects( type: string) {
    return this.http.get(this.url + type);
  }
}
