import { AfterContentInit, Component, OnInit } from "@angular/core";
import { faX, faCheck } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-challenge-wrapper",
  templateUrl: "./challenge-wrapper.component.html",
  styleUrls: ["./challenge-wrapper.component.scss"]
})
export class ChallengeWrapperComponent implements OnInit, AfterContentInit {
    faX = faX;
    faCheck = faCheck;

    solved: boolean = true;

    constructor() {}

    ngAfterContentInit() {}

    ngOnInit(): void {}
}
