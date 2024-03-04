
// import { gql, GraphQLClient } from 'graphql-request';
// import { config } from '../services/config';


// const endpoint = `https://programs.shyft.to/v0/graphql?api_key={config.shyftApiKey}`; //Shyft's gQl endpoint

// const graphQLClient = new GraphQLClient(endpoint, {
//   method: `POST`,
//   jsonSerializer: {
//     parse: JSON.parse,
//     stringify: JSON.stringify,
//   },
// }); //Initialize gQL Client

// async function getFeesOwedbyWallet(walletAddr) {
//     const token = await getWhirlpoolPositionToken(walletAddr);

//     const query = gql`
//     query MyQuery {
//         ORCA_WHIRLPOOLS_position(
//           where: {positionMint: {_eq: ${JSON.stringify(token.address)}}}
//         ) {
//           feeOwedB
//           feeOwedA
//           liquidity
//           positionMint
//           pubkey
//           whirlpool
//         }
//       }
//     `;

//   const response = await graphQLClient.request(query);
//   console.dir(response,{depth: null});
  
// }
// getFeesOwedbyWallet('2v112XbwQXFrdqX438HUrfZF91qCZb7QRP4bwUiN7JF5')

























// @Injectable({ providedIn: 'root' })
// export class  {
//     private readonly _httpClient= inject(HttpClient);
//     private readonly _key = config.shyftApiKey
//     private readonly _header= { 'x-api-key': this._key };
//     private _tokenAddressesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    
//     getAllTokens(publicKey: string | undefined | null ) {

//     if (!publicKey) {
//       return of(null);
//     }
    
//     const url = new URL('https://api.shyft.to/sol/v1/wallet/all_tokens');
    
//     url.searchParams.set('network', 'mainnet-beta');
//     url.searchParams.set('wallet', publicKey);
    
//     return this._httpClient.get<{
//       result: { address: string ; balance: number; info: { name: string, symbol: string, image: string }; }[];
//     }>(url.toString(), { headers: this._header }).pipe(
//     tap(response => {
//       // Almacenar la dirección del token
//       if (response.result && response.result.length > 0) {
//         const tokenAddresses = response.result.map(token => token.address);
//         console.log("Token addresses:", tokenAddresses);
//         this._tokenAddressesSubject.next(tokenAddresses);
//       }
//     }),
//     map((response) => response.result)
//     );
//     } 
//     getTokenAddresses(): Observable<string[]> {
//       return this._tokenAddressesSubject.asObservable();
//     }
//   }