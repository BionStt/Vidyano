var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vidyano;
(function (Vidyano) {
    var WebComponents;
    (function (WebComponents) {
        var ActionButton = (function (_super) {
            __extends(ActionButton, _super);
            function ActionButton() {
                _super.apply(this, arguments);
            }
            ActionButton.prototype._executeWithoutOptions = function (e) {
                if (!this.hasOptions)
                    this._execute();
            };
            ActionButton.prototype._executeWithOption = function (e) {
                var li = e.target;
                this._execute(parseInt(li.getAttribute("data-option-index"), 10));
            };
            ActionButton.prototype._execute = function (option) {
                if (option === void 0) { option = -1; }
                if (this.canExecute) {
                    if (!this.item)
                        this.action.execute(option);
                    else
                        this.action.execute(option, null, [this.item]);
                }
            };
            ActionButton.prototype._updateCanExecuteHook = function () {
                var _this = this;
                if (this._propertyChangedObserver) {
                    this._propertyChangedObserver();
                    this._propertyChangedObserver = undefined;
                }
                if (this.action && this.isAttached) {
                    this._propertyChangedObserver = this.action.propertyChanged.attach(function (action, detail) {
                        if (detail.propertyName == "canExecute")
                            _this._setCanExecute(_this.item ? _this.action.definition.selectionRule(1) : _this.action.canExecute);
                        else if (detail.propertyName == "isVisible")
                            _this._setHidden(!detail.newValue);
                    });
                    this._setCanExecute(this.item ? this.action.definition.selectionRule(1) : this.action.canExecute);
                    this._setHidden(!this.action.isVisible);
                }
            };
            ActionButton.prototype._computeIcon = function () {
                return this.action ? 'Icon_Action_' + this.action.definition.name : "";
            };
            ActionButton.prototype._computeHasOptions = function (action) {
                return action && action.options && action.options.length > 0;
            };
            return ActionButton;
        })(WebComponents.WebComponent);
        WebComponents.ActionButton = ActionButton;
        WebComponents.WebComponent.register(ActionButton, WebComponents, "vi", {
            properties: {
                action: {
                    type: Object,
                    observer: "_updateCanExecuteHook"
                },
                isAttached: {
                    type: Boolean,
                    observer: "_updateCanExecuteHook"
                },
                item: Object,
                icon: {
                    type: String,
                    computed: "_computeIcon(action)"
                },
                noLabel: {
                    type: Boolean,
                    reflectToAttribute: true
                },
                noIcon: {
                    type: Boolean,
                    reflectToAttribute: true
                },
                canExecute: {
                    type: Boolean,
                    readOnly: true
                },
                hidden: {
                    type: Boolean,
                    reflectToAttribute: true,
                    readOnly: true
                },
                hasOptions: {
                    type: Boolean,
                    computed: "_computeHasOptions(action)"
                },
                options: {
                    type: Array,
                    computed: "action.options"
                },
                overflow: {
                    type: Boolean,
                    reflectToAttribute: true
                }
            }
        });
    })(WebComponents = Vidyano.WebComponents || (Vidyano.WebComponents = {}));
})(Vidyano || (Vidyano = {}));
