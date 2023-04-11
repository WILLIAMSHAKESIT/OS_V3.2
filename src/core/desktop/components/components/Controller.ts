import * as PIXI from 'pixi.js';
import Functions from '../../Functions';
import ModalMenu from './ModalMenu';
import ModalInfo from './ModalInfo';
import ModalAutoplay from './ModalAutoplay';

export default class Controller {
    private app: PIXI.Application;
    public container: PIXI.Container;
    public play_container: PIXI.Container;
    public controller_parent: PIXI.Sprite;
    public info_button: PIXI.Sprite;
    public sound_button: PIXI.Sprite;
    public menu_button: PIXI.Sprite;
    public singleplay_button: PIXI.Sprite;
    public autoplay_button: PIXI.Sprite;
    private bet_box: PIXI.Container;
    public balance_box: PIXI.Container;
    public playtext: PIXI.Text;
    public tapspacetext: PIXI.Text;
    public paylinetext: PIXI.Text;
    //variable
    public marginside: number = 100;
    private gaps: number = 10;
    private betvalue: PIXI.Text;
    public bet: number;
    public balance: number = 100000;
    public balancevalue: PIXI.Text;
    private showmenu: Boolean = false;
    private showinfo: Boolean = false;
    private showautoplay: Boolean = false;
    public mybuttons: Array<PIXI.Sprite> = [];
    //components
    public modalmenu: ModalMenu;
    public modalinfo: ModalInfo;
    public modalautoplay: ModalAutoplay;
    private openmodal: (bool: Boolean) => void;
    private autoplay: (number: number) => void;
    private bonusprizeupdate: (val : number) => void;
    public paylinetopcontainer: PIXI.Container;
    public paylinebottomcontainer: PIXI.Container;
    private playSound: (index: number) => void; 
    private muteSound: (type: string, bol:Boolean) => void;
    private checkSounds:(bol:Boolean) => void;
    private isMute: Boolean;

    constructor(app: PIXI.Application, openmodal: (bool: Boolean) => void, autoplay: (number: number) => void, bonusprizeupdate: (val : number) => void, playSound: (number: number) => void, muteSound: (type: string, bol:Boolean) => void, isMute:Boolean,checkSounds:(bol:Boolean) => void ){
        this.container = new PIXI.Container();
        this.paylinebottomcontainer = new PIXI.Container;
        this.paylinetopcontainer = new PIXI.Container;
        this.play_container = new PIXI.Container();
        this.app = app;
        this.openmodal = openmodal;
        this.autoplay = autoplay;
        this.bonusprizeupdate = bonusprizeupdate;
        this.playSound = playSound;
        this.muteSound = muteSound;
        this.isMute = isMute;
        this.checkSounds = checkSounds;
        this.init();
    }

    private init() {
        this.createParent();
        this.createMenuModal();
        this.createModalInfo();
        this.createModalAutoplay();
        this.createInfoButton();
        this.createSoundButton();
        this.createMenuButton();
        this.createPlayButton();
        this.createBetBalanceBox();
        this.createPaylineBox();
        //positioning
        //parent
        this.controller_parent.position.x = (this.container.width - this.controller_parent.width) / 2;
        //info button
        this.info_button.position.x = 125;
        this.info_button.position.y = 12;
        //sound button
        this.sound_button.position.x = 62;
        this.sound_button.position.y = 90;
        //menu button
        this.menu_button.position.x = 184;
        this.menu_button.position.y = 90;
        //bet box
        this.bet_box.position.x = 305;
        this.bet_box.position.y = 82;
        //balance box
        this.balance_box.position.x = 1280;
        this.balance_box.position.y = 82;
        //main container
        this.container.position.x = (this.app.screen.width - this.container.width) / 2;
        this.container.position.y = (this.app.screen.height - this.container.height);
    }

    private createParent(){
        this.controller_parent = Functions.loadSprite(this.app.loader, 'controllers', 'controls.png', false);
        this.controller_parent.width = this.app.screen.width;
        this.container.addChild(this.controller_parent);
    }

    private createInfoButton(){
        this.info_button = Functions.loadSprite(this.app.loader, 'controllers', 'info.png', false);
        this.info_button.interactive = true;
        this.info_button.buttonMode = true;
        this.mybuttons.push(this.info_button);
        this.container.addChild(this.info_button);
        this.info_button.addListener("pointerdown", () => {
            this.playSound(9)
            if(!this.showinfo){
                this.openmodal(true);
                this.showinfo = true;
                this.mybuttons.forEach(element => {
                    element.buttonMode = false;
                    element.interactive = false;
                });
                this.app.stage.addChild(this.modalinfo.container);
            }
        });
    }

    private createSoundButton(){
        this.sound_button = Functions.loadSprite(this.app.loader, 'controllers', 'sound_on.png', false);
        this.sound_button.interactive = true;
        this.sound_button.buttonMode = true;
        this.mybuttons.push(this.sound_button);
        this.container.addChild(this.sound_button);
    }

    private createMenuButton(){
        this.menu_button = Functions.loadSprite(this.app.loader, 'controllers', 'system_settings.png', false);
        this.menu_button.interactive = true;
        this.menu_button.buttonMode = true;
        this.mybuttons.push(this.menu_button);
        this.container.addChild(this.menu_button);
        this.menu_button.addListener("pointerdown", () => {
            this.playSound(9)
            if(!this.showmenu){
                this.openmodal(true);
                this.showmenu = true;
                this.mybuttons.forEach(element => {
                    element.buttonMode = false;
                    element.interactive = false;
                });
                this.app.stage.addChild(this.modalmenu.container);
            }
        });
    }

    private createMenuModal(){
        this.modalmenu = new ModalMenu(this.app, this.updateBet.bind(this), this.bonusprizeupdate.bind(this), this.playSound.bind(this), this.muteSound.bind(this),this.isMute,this.checkSounds.bind(this));
        this.bet = this.modalmenu.bet_value;
        this.modalmenu.modal_close.addListener("pointerdown", () => {
            this.playSound(9)
            this.showmenu = false;
            this.openmodal(false);
            this.app.stage.removeChild(this.modalmenu.container);
            this.mybuttons.forEach(element => {
                element.buttonMode = true;
                element.interactive = true;
            });
        });
    }

    private createModalAutoplay(){
        this.modalautoplay = new ModalAutoplay(this.app, this.closeAutoPlay.bind(this), this.autoplay.bind(this),this.playSound.bind(this));
        this.modalautoplay.modal_close.addListener("pointerdown", () => {
            this.playSound(9)
            this.closeAutoPlay();
        });
    }

    private closeAutoPlay(){
        this.showautoplay = false;
        this.openmodal(false);
        this.app.stage.removeChild(this.modalautoplay.container);
        this.mybuttons.forEach(element => {
            element.buttonMode = true;
            element.interactive = true;
        });
    }

    private createModalInfo(){
        this.modalinfo = new ModalInfo(this.app, this.playSound.bind(this));
        this.modalinfo.modal_close.addListener("pointerdown", () => {
            this.playSound(9)
            this.showinfo = false;
            this.openmodal(false);
            this.app.stage.removeChild(this.modalinfo.container);
            this.mybuttons.forEach(element => {
                element.buttonMode = true;
                element.interactive = true;
            });
        });
    }

    private createPlayButton(){
        //single play
        this.singleplay_button = Functions.loadSprite(this.app.loader, 'controllers', 'spin_button.png', false);
        this.singleplay_button.interactive = true;
        this.singleplay_button.buttonMode = true;
        this.mybuttons.push(this.singleplay_button);
        this.container.addChild(this.singleplay_button);
        //auto play
        this.autoplay_button = Functions.loadSprite(this.app.loader, 'controllers', 'autoplay.png', false);
        this.autoplay_button.interactive = true;
        this.autoplay_button.buttonMode = true;
        this.mybuttons.push(this.autoplay_button);
        this.container.addChild(this.autoplay_button);
        this.autoplay_button.addListener("pointerdown", () => {
            this.playSound(9)
            if(!this.showautoplay){
                this.openmodal(true);
                this.showautoplay = true;
                this.mybuttons.forEach(element => {
                    element.buttonMode = false;
                    element.interactive = false;
                });
                this.app.stage.addChild(this.modalautoplay.container);
            }
        });
        //position
        this.singleplay_button.position.x = 1646;
        this.singleplay_button.position.y = 9;
        this.autoplay_button.position.x = 1805;
        this.autoplay_button.position.y = 90;

    }

    private createBetBalanceBox(){
        this.bet_box = Functions.loadSprite(this.app.loader, 'controllers', 'bet_container.png', false);
        this.container.addChild(this.bet_box);
        this.balance_box = Functions.loadSprite(this.app.loader, 'controllers', 'credit_container.png', false);
        this.container.addChild(this.balance_box);

        // const style = new PIXI.TextStyle({
        //     fontFamily: 'Luckiest Guy',
        //     fontSize: 60,
        //     fontWeight: 'bold',
        //     fill: '#12d8dc',
        // });
        const style2 = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 60,
            fontWeight: 'bold',
            fill: '#ffffff',
        });
        // const style3 = new PIXI.TextStyle({
        //     fontFamily: 'Luckiest Guy',
        //     fontSize: 45,
        //     fontWeight: 'bold',
        //     fill: '#12d8dc',
        // });
        const style4 = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 45,
            fontWeight: 'bold',
            fill: '#ffffff',
        });
        //bet
        this.betvalue = new PIXI.Text(Functions.formatNumber(this.bet), style2);
        this.bet_box.addChild(this.betvalue)
        this.betvalue.position.x = (this.bet_box.width - this.betvalue.width) / 2;
        this.betvalue.position.y = (this.bet_box.height - this.betvalue.height) / 2;
        //balance
        this.balancevalue = new PIXI.Text(Functions.formatNumber(this.balance), style4);
        this.balance_box.addChild(this.balancevalue);
        this.balancevalue.position.x = (this.balance_box.width - this.balancevalue.width) / 2;
        this.balancevalue.position.y = (this.balance_box.height - this.balancevalue.height) / 2;
    }

    private createPaylineBox(){
        //payline text
        const style = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 39,
            fontWeight: 'bold',
            fill: '#ffffff',
        });

        this.tapspacetext = new PIXI.Text("TAP SPACE TO SKIP ANIMATIONS", style);
        this.paylinetopcontainer.addChild(this.tapspacetext)
        this.controller_parent.addChild(this.paylinetopcontainer);
        this.paylinetopcontainer.position.x = (this.controller_parent.width - this.paylinetopcontainer.width) / 2;
        this.paylinetopcontainer.position.y = 105;

        const style2 = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 65,
            fontWeight: 'bold',
            fill: '#12d8dc',
        });
        this.paylinetext = new PIXI.Text('SPIN TO WIN!', style2);
        this.paylinebottomcontainer.addChild(this.paylinetext);
        this.controller_parent.addChild(this.paylinebottomcontainer);
        this.paylinebottomcontainer.position.x = (this.controller_parent.width - this.paylinebottomcontainer.width) / 2;
        this.paylinebottomcontainer.position.y = 25;
    }

    private updateBet(val: number){
        this.betvalue.text = Functions.formatNumber(val);
        this.betvalue.position.x = (this.bet_box.width - this.betvalue.width) / 2;
        this.bet = val;
    }


}
