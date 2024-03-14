import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { map, of } from 'rxjs';
import { config } from '../services/config'


//peticion para buscar los NFT de orca de la wallet
@Injectable({ providedIn: 'root' })
export class OrcaNftList {
  private readonly _httpClient= inject(HttpClient);
  private readonly _key = config.shyftApiKey
  private readonly _header= { 'x-api-key': this._key };
  
  getOrcaNfts(publicKey: string | undefined | null) {
    
    if (!publicKey) {
      return of(null);
    }
    
    const url = new URL('https://api.shyft.to/sol/v1/nft/read_all');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('address', publicKey);
    url.searchParams.set('update_authority', '3axbTs2z5GBy6usVbNVoqEgZMng3vZvMnAoX29BFfwhr')
    
    return this._httpClient.get<{
      result: { key: number, name: string, description: string, atributes: { }  }[];
    }>(url.toString(), { headers: this._header })
    .pipe(map((response) => response.result));
  }
}

