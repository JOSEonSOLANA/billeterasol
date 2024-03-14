import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, of } from 'rxjs';
import { config } from '../services/config'


@Injectable({ providedIn: 'root' })

export class TensorListCollection {
    private readonly _httpClient= inject(HttpClient);
    private readonly _key = config.shyftApiKey
    private readonly _header= { 'x-api-key': this._key };
    
    getTensorNftList(publicKey: string | undefined | null) {
  
      if (!publicKey) {
        return of(null);
      }

    const url = new URL('https://programs.shyft.to/v0/graphql');

    url.searchParams.set('api_key', config.shyftApiKey);
    url.searchParams.set('network', 'mainnet-beta');
    

    return this._httpClient.get<{
      tensor_bid_Bidstate: { bidAmount: number, bidder: string, expiry: number, nftMint: string, pubkey: string };
    }>(url.toString(), { headers: this._header })
    .pipe(map((response) => response.tensor_bid_Bidstate));
  }
  

 
}


