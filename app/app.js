var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var repoStore_1 = require('./services/repoStore');
var changeLogStore_1 = require('./services/changeLogStore');
var RepoApp = (function () {
    function RepoApp(repoStore, changeLogStore) {
        var _this = this;
        this.newRepoText = '';
        this.repoStore = repoStore;
        this.changeLogStore = changeLogStore;
        // when loads app repos already added onto page
        this.repoStore.repos.forEach(function (item) {
            _this.changeLogStore.add(item.title);
        });
    }
    RepoApp.prototype.remove = function (repo) {
        this.changeLogStore.remove(repo);
        this.repoStore.remove(repo);
    };
    RepoApp.prototype.addRepo = function () {
        if (this.newRepoText.trim().length) {
            this.changeLogStore.add(this.newRepoText.trim());
            this.repoStore.add(this.newRepoText.trim());
            this.newRepoText = '';
        }
    };
    RepoApp = __decorate([
        core_1.Component({
            selector: 'repo-app',
            templateUrl: 'app/app.html',
            bindings: [changeLogStore_1.ChangeLogStore, repoStore_1.RepoStore]
        }), 
        __metadata('design:paramtypes', [repoStore_1.RepoStore, changeLogStore_1.ChangeLogStore])
    ], RepoApp);
    return RepoApp;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RepoApp;
//# sourceMappingURL=app.js.map