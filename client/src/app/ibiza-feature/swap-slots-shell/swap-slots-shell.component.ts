import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-swap-slots-shell',
    templateUrl: './swap-slots-shell.component.html',
    styleUrls: ['./swap-slots-shell.component.scss']
})
export class SwapSlotsShellComponent implements OnDestroy {
    resourceId: string;
    ngUnsubscribe: Subject<void>;

    constructor(translateService: TranslateService, route: ActivatedRoute) {
        this.ngUnsubscribe = new Subject<void>();

        route.params
            .takeUntil(this.ngUnsubscribe)
            .subscribe(x => {
                this.resourceId = `/subscriptions/${x['subscriptionId']}/resourceGroups/${x[
                    'resourceGroup'
                ]}/providers/Microsoft.Web/sites/${x['site']}` + (x['slot'] ? `/slots/${x['slot']}` : ``);
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
    }
}
