import { baseUrl } from "../ApiCallSetup";
import { LoginApiCall } from "./AuthApiCalls";


describe('AuthApiCalls.ts', () => 
{

    beforeEach(() => {
        (global as any).fetch.resetMocks();
      });
 
    it('calls LoginApiCalls', async()=>
    {
     let mockFetched =  (global as any).fetch;
     let credentials:any = {};
     await LoginApiCall(credentials);
     expect(mockFetched).toHaveBeenCalledTimes(1);   
    });

   
    
});