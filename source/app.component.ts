import { Component } from "@angular/core";
import { AmplifyService } from "aws-amplify-angular";
import { Storage } from "aws-amplify";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "demo-amplify";
  signedIn: boolean;
  user: any;
  greeting: string;

  constructor(private amplifyService: AmplifyService) {
    this.amplifyService.authStateChange$.subscribe(authState => {
      this.signedIn = authState.state === "signedIn";
      if (!authState.user) {
        this.user = null;
      } else {
        this.user = authState.user;
        this.greeting = "Hello " + this.user.username;
      }
    });
  }

  onClickUploadPrivate() {
    console.log("Uploading Private");
    Storage.put("test-private.txt", "Hello", {
      level: "protected",
      contentType: "text/plain"
    })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
}
