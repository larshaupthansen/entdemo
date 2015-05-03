using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
namespace entdemo.website.Controllers
{
    public class LinkedInController : Controller
    {

        public class LinkedIn
        {
            public string access_token;
            public int expires_in;
        }
        // GET: LinkedInAuth
        public ActionResult Auth()
        {
            WebClient client = new WebClient();

            string code = Request["code"];
            string state = Request["state"];

            string url = "https://www.linkedin.com/uas/oauth2/accessToken";

            string currentUrl = System.Web.HttpContext.Current.Request.Url.AbsoluteUri;
            if (currentUrl.IndexOf("?") >= 0)
            {
                currentUrl = currentUrl.Substring(0, currentUrl.IndexOf("?"));
            }
            string content = "grant_type=authorization_code"
                        + "&code=" + code
                        + "&redirect_uri=" + System.Web.HttpContext.Current.Server.UrlEncode(currentUrl)
                        + "&client_id=77ne8opwwucq5l"
                        + "&client_secret=5AySUuNe4m8ealLz";


            client.Headers.Add(HttpRequestHeader.ContentType, "application/x-www-form-urlencoded");

            string response = client.UploadString(url, content);
            LinkedIn resp = JsonConvert.DeserializeObject<LinkedIn>(response);
            string redirect = "/signin-linkedin.html?access_token=" + resp.access_token + "&expires_in=" + resp.expires_in;
            return Redirect(redirect);
        }

        public JsonResult Proxy(string accessToken, string url) {

            WebClient client = new WebClient();
            client.Headers.Add("Authorization", "Bearer " + accessToken);
            string response = client.DownloadString(url);

            Dictionary<string, string> foo = JsonConvert.DeserializeObject<Dictionary<string, string>>(response);

            return new JsonResult()
            {
                Data = foo
            };

        }

    }
}