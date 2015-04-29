using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;

namespace entdemo.website.Controllers
{


    public class LinkedIn {
        public string access_token;
        public int expires_in;

    }
    public class LinkedInController : ApiController
    {
        // GET: api/LinkedIn
        public LinkedIn Get(string code, string state)
        {
            WebClient client = new WebClient();


            string url = "https://www.linkedin.com/uas/oauth2/accessToken";

            string currentUrl = System.Web.HttpContext.Current.Request.Url.AbsoluteUri;
            if (currentUrl.IndexOf("?") >= 0) {
                currentUrl = currentUrl.Substring(0, currentUrl.IndexOf("?"));
            }
            string content = "grant_type=authorization_code"
                        + "&code=" + code
                        + "&redirect_uri=" + System.Web.HttpContext.Current.Server.UrlEncode(currentUrl)
                        + "&client_id=77ne8opwwucq5l"
                        + "&client_secret=5AySUuNe4m8ealLz";


            client.Headers.Add(HttpRequestHeader.ContentType, "application/x-www-form-urlencoded");

            string response = client.UploadString(url, content);
            
            return new LinkedIn();
        }

    }
}
