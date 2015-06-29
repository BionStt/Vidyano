module Vidyano.WebComponents {
    export class QueryPresenter extends WebComponent {
        private _cacheEntry: QueryAppCacheEntry;
        queryId: string;
        query: Vidyano.Query;

        private _setLoading: (loading: boolean) => void;
        private _setError: (error: string) => void;

        private _activating(e: CustomEvent, detail: { route: AppRoute; parameters: any; }) {
            this._setApp(detail.route.app);
            
            this._cacheEntry = <QueryAppCacheEntry>this.app.cache(new QueryAppCacheEntry(detail.parameters.id));
            if (this._cacheEntry && this._cacheEntry.query)
                this.query = this._cacheEntry.query;
            else {
                this.queryId = this.query = undefined;
                this.queryId = detail.parameters.id;
            }
        }

        private _computeQuery() {
            if (this.query && this.query.id == this.queryId)
                return;

            if (this.queryId) {
                if(this.query)
                    this.query = null;

                this._setLoading(true);
                
                this.app.service.getQuery(this.queryId).then(query => {
                    if (query.id == this.queryId) {
                        this._cacheEntry = <QueryAppCacheEntry>this.app.cache(new QueryAppCacheEntry(query.id));
                        this.query = this._cacheEntry.query = query;
                    }

                    this._setLoading(false);
                }, e => {
                        this._setLoading(false);
                    });
            }
            else
                this.query = null;
        }

        private _queryChanged(newQuery: Vidyano.Query, oldQuery: Vidyano.Query) {
            if (oldQuery)
                this.empty();

            if (this.query) {
                var query = new Vidyano.WebComponents.Query();
                query.query = this.query;
                Polymer.dom(this).appendChild(query);
            }
        }
    }

    WebComponent.register(QueryPresenter, WebComponents, "vi", {
        properties: {
            queryId: {
                type: String,
                observer: "_computeQuery",
                reflectToAttribute: true
            },
            query: {
                type: Object,
                observer: "_queryChanged"
            },
            loading: {
                type: Boolean,
                readOnly: true,
                value: true,
                reflectToAttribute: true
            },
            error: {
                type: String,
                readOnly: true
            },
            hasError: {
                type: Boolean,
                reflectToAttribute: true,
                computed: "_computeHasError(error)"
            }
        },
        listeners: {
            "activating": "_activating"
        }
    });
}