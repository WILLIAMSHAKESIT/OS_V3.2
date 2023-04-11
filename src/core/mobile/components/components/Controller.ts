import * as PIXI from 'pixi.js';
import Functions from '../../Functions';
import ModalMenu from './ModalMenu';
import ModalInfo from './ModalInfo';
import ModalAutoplay from './ModalAutoplay';

export default class Controller {
    private app: PIXI.Application;
    public container: PIXI.Container;
    public container_pt: PIXI.Container;
    public play_container: PIXI.Container;
    public controller_parent: PIXI.Sprite;
    public controller_parent_pt: PIXI.Sprite;
    public info_button: PIXI.Sprite;
    public info_button_pt: PIXI.Sprite;
    public sound_button: PIXI.Sprite;
    public menu_button: PIXI.Sprite;
    public menu_button_pt: PIXI.Sprite;
    public singleplay_button: PIXI.Sprite;
    public autoplay_button: PIXI.Sprite;
    public singleplay_button_pt: PIXI.Sprite;
    public autoplay_button_pt: PIXI.Sprite;
    public bet_box: PIXI.Container;
    public balance_box: PIXI.Container;
    public bet_box_pt: PIXI.Container;
    public balance_box_pt: PIXI.Container;
    public playtext: PIXI.Text;
    public tapspacetext: PIXI.Text;
    public paylinetext: PIXI.Text;
    public tapspacetext_pt: PIXI.Text;
    public paylinetext_pt: PIXI.Text;
    //variable
    public marginside: number = 100;
    private gaps: number = 10;
    private betvalue: PIXI.Text;
    private betvalue_pt: PIXI.Text;
    public bet: number;
    public balance: number = 100000;
    public balancevalue: PIXI.Text;
    public balancevalue_pt: PIXI.Text;
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
    private isMute: Boolean;

    constructor(app: PIXI.Application, openmodal: (bool: Boolean) => void, autoplay: (number: number) => void, bonusprizeupdate: (val : number) => void, playSound: (number: number) => void, muteSound: (type: string, bol:Boolean) => void, isMute:Boolean) {
        this.container = new PIXI.Container();
        this.container_pt = new PIXI.Container();
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
        this.init();
    }

    private init() {
        this.createParent();
        this.createParentPortrait();
        this.createMenuModal();
        this.createModalInfo();
        this.createModalAutoplay();
        this.createInfoButton();
        this.createInfoButtonPortrait();
        this.createSoundButton();
        this.createMenuButton();
        this.createMenuButtonPortrait();
        this.createPlayButton();
        this.createPlayButtonPortrait();
        this.createBetBalanceBox();
        this.createBetBalanceBoxPortrait();
        this.createPaylineBox();
        //positioning
        //parent
        this.controller_parent.position.x = (this.container.width - this.controller_parent.width) / 2;
        //info button
        this.info_button.position.x = 1645;
        this.info_button.position.y = 68;
        //sound button
        this.sound_button.position.x = 62;
        this.sound_button.position.y = 90;
        //menu button
        this.menu_button.position.x = 166;
        this.menu_button.position.y = 79;
        this.menu_button_pt.position.x = 118;
        this.menu_button_pt.position.y = 118;
        //bet box
        this.bet_box.position.x = 305;
        this.bet_box.position.y = 82;
        this.bet_box_pt.position.x = 80;
        this.bet_box_pt.position.y = 440;
        // balance box
        this.balance_box.position.x = 1280;
        this.balance_box.position.y = 82;
        this.balance_box_pt.position.x = 635;
        this.balance_box_pt.position.y = 440;
        // main container
        this.container.position.x = (this.app.screen.width - this.container.width) / 2;
        this.container.position.y = (this.app.screen.height - this.container.height);
    }

    private createParentPortrait(){
        this.controller_parent_pt = Functions.loadSprite(this.app.loader, 'new_controlls', 'pt_controllers_container.png', false);
        // this.controller_parent_pt.width = this.app.screen.width;
        this.container_pt.addChild(this.controller_parent_pt); 
    }

    private createParent(){
        this.controller_parent = Functions.loadSprite(this.app.loader, 'new_controlls', 'ls_controllers_container.png', false);
        // this.controller_parent.width = this.app.screen.width;
        this.container.addChild(this.controller_parent);
    }

    private createInfoButtonPortrait(){
        this.info_button_pt = Functions.loadSprite(this.app.loader, 'new_controlls', 'infobtn_portait.png', false);
        this.info_button_pt.scale.set(.7);
        this.info_button_pt.interactive = true;
        this.info_button_pt.buttonMode = true;
        this.mybuttons.push(this.info_button_pt);
        // this.container_pt.addChild(this.info_button_pt);
        this.info_button_pt.addListener("pointerdown", () => {
            this.playSound(9)
            if(!this.showinfo){
                this.openmodal(true);
                this.showinfo = true;
                this.mybuttons.forEach(element => {
                    element.buttonMode = false;
                    element.interactive = false;
                });
                this.app.stage.addChild(this.modalinfo.overlay);
                this.app.stage.addChild(this.modalinfo.container);
            }
        });
    }

    private createInfoButton(){
        this.info_button = Functions.loadSprite(this.app.loader, 'new_controlls', 'info_btn.png', false);
        this.info_button.scale.set(.7);
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
                this.app.stage.addChild(this.modalinfo.overlay);
                this.app.stage.addChild(this.modalinfo.container);
            }
        });
    }

    private createSoundButton(){
        this.sound_button = Functions.loadSprite(this.app.loader, 'controllers', 'sound_on.png', false);
        this.sound_button.interactive = true;
        this.sound_button.buttonMode = true;
        this.sound_button.alpha = 0;
        this.mybuttons.push(this.sound_button);
        // this.container.addChild(this.sound_button);
    }

    private createMenuButton(){
        this.menu_button = Functions.loadSprite(this.app.loader, 'new_controlls', 'menu_btn.png', false);
        this.menu_button.scale.set(.7);
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
                this.app.stage.addChild(this.modalmenu.overlay);
                this.app.stage.addChild(this.modalmenu.container);
            }
        });
    }

    private createMenuButtonPortrait(){
        this.menu_button_pt = Functions.loadSprite(this.app.loader, 'new_controlls', 'menubtn_portrait.png', false);
        this.menu_button_pt.scale.set(.7);
        this.menu_button_pt.interactive = true;
        this.menu_button_pt.buttonMode = true;
        this.mybuttons.push(this.menu_button_pt);
        this.container_pt.addChild(this.menu_button_pt);
        this.menu_button_pt.addListener("pointerdown", () => {
            this.playSound(9)
            if(!this.showmenu){
                this.openmodal(true);
                this.showmenu = true;
                this.mybuttons.forEach(element => {
                    element.buttonMode = false;
                    element.interactive = false;
                });
                this.app.stage.addChild(this.modalmenu.overlay);
                this.app.stage.addChild(this.modalmenu.container);
            }
        });
    }

    private createMenuModal(){
        this.modalmenu = new ModalMenu(this.app, this.updateBet.bind(this), this.bonusprizeupdate.bind(this), this.playSound.bind(this), this.muteSound.bind(this),this.isMute);
        this.bet = this.modalmenu.bet_value;
        this.modalmenu.modal_close.addListener("pointerdown", () => {
            this.playSound(9)
            this.showmenu = false;
            this.openmodal(false);
            this.app.stage.removeChild(this.modalmenu.overlay);
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
        this.app.stage.removeChild(this.modalautoplay.overlay);
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
            this.app.stage.removeChild(this.modalinfo.overlay);
            this.app.stage.removeChild(this.modalinfo.container);
            this.mybuttons.forEach(element => {
                element.buttonMode = true;
                element.interactive = true;
            });
        });
    }

    private createPlayButton(){
        //single play
        this.singleplay_button = Functions.loadSprite(this.app.loader, 'new_controlls', 'play_btn.png', false);
        this.singleplay_button.interactive = true;
        this.singleplay_button.buttonMode = true;
        this.mybuttons.push(this.singleplay_button);
        // this.container.addChild(this.singleplay_button);
        //auto play
        this.autoplay_button = Functions.loadSprite(this.app.loader, 'new_controlls', 'autoplay_btn.png', false);
        this.autoplay_button.interactive = true;
        this.autoplay_button.buttonMode = true;
        this.mybuttons.push(this.autoplay_button);
        // this.container.addChild(this.autoplay_button);
        this.autoplay_button.addListener("pointerdown", () => {
            this.playSound(9)
            if(!this.showautoplay){
                this.openmodal(true);
                this.showautoplay = true;
                this.mybuttons.forEach(element => {
                    element.buttonMode = false;
                    element.interactive = false;
                });
                this.app.stage.addChild(this.modalautoplay.overlay);
                this.app.stage.addChild(this.modalautoplay.container);
            }
        });
        //position
        this.autoplay_button.width = 150;
        this.autoplay_button.height = 130;
        this.singleplay_button.width = 200;
        this.singleplay_button.height = 180;
        // this.autoplay_button.scale.set(.7);
        // this.singleplay_button.scale.set(.7);
    }

    private createPlayButtonPortrait(){
        //single play
        this.singleplay_button_pt = Functions.loadSprite(this.app.loader, 'new_controlls', 'play_btn.png', false);
        this.singleplay_button_pt.interactive = true;
        this.singleplay_button_pt.buttonMode = true;
        this.mybuttons.push(this.singleplay_button_pt);
        this.container_pt.addChild(this.singleplay_button_pt);
        //auto play
        this.autoplay_button_pt = Functions.loadSprite(this.app.loader, 'new_controlls', 'autoplay_btn.png', false);
        this.autoplay_button_pt.interactive = true;
        this.autoplay_button_pt.buttonMode = true;
        this.mybuttons.push(this.autoplay_button_pt);
        this.container_pt.addChild(this.autoplay_button_pt);
        this.autoplay_button_pt.addListener("pointerdown", () => {
            this.playSound(9)
            if(!this.showautoplay){
                this.openmodal(true);
                this.showautoplay = true;
                this.mybuttons.forEach(element => {
                    element.buttonMode = false;
                    element.interactive = false;
                });
                this.app.stage.addChild(this.modalautoplay.overlay);
                this.app.stage.addChild(this.modalautoplay.container);
            }
        });
        this.singleplay_button_pt.x = 417;
        this.singleplay_button_pt.y = 28;
        this.autoplay_button_pt.x = 802;
        this.autoplay_button_pt.y = 118;
    }

    private createBetBalanceBox(){
        this.bet_box = Functions.loadSprite(this.app.loader, 'controllers', 'bet_container.png', false);
        this.container.addChild(this.bet_box);
        this.balance_box = Functions.loadSprite(this.app.loader, 'controllers', 'credit_container.png', false);
        this.container.addChild(this.balance_box);
        const style2 = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 60,
            fontWeight: 'bold',
            fill: '#ffffff',
        });
        const style4 = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 60,
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
   
    private createBetBalanceBoxPortrait(){
        this.bet_box_pt = Functions.loadSprite(this.app.loader, 'controllers', 'bet_container.png', false);
        this.container_pt.addChild(this.bet_box_pt);
        this.balance_box_pt = Functions.loadSprite(this.app.loader, 'controllers', 'credit_container.png', false);
        this.container_pt.addChild(this.balance_box_pt);
        const style2 = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 60,
            fontWeight: 'bold',
            fill: '#ffffff',
        });
        const style4 = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 60,
            fontWeight: 'bold',
            fill: '#ffffff',
        });
        //bet
        this.betvalue_pt = new PIXI.Text(Functions.formatNumber(this.bet), style2);
        this.bet_box_pt.addChild(this.betvalue_pt)
        this.betvalue_pt.position.x = (this.bet_box_pt.width - this.betvalue_pt.width) / 2;
        this.betvalue_pt.position.y = (this.bet_box_pt.height - this.betvalue_pt.height) / 2;
        //balance
        this.balancevalue_pt = new PIXI.Text(Functions.formatNumber(this.balance), style4);
        this.balance_box_pt.addChild(this.balancevalue_pt);
        this.balancevalue_pt.position.x = (this.balance_box_pt.width - this.balancevalue_pt.width) / 2;
        this.balancevalue_pt.position.y = (this.balance_box_pt.height - this.balancevalue_pt.height) / 2;
    }

    private createPaylineBox(){
        //payline text
        const style = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 39,
            fontWeight: 'bold',
            fill: '#ffffff',
        });

        this.tapspacetext = new PIXI.Text("TAP TO SKIP ANIMATIONS", style);
        this.paylinetopcontainer.addChild(this.tapspacetext)

        const style2 = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 65,
            fontWeight: 'bold',
            fill: '#12d8dc',
        });
        this.paylinetext = new PIXI.Text('SPIN TO WIN!', style2);
        this.paylinebottomcontainer.addChild(this.paylinetext);
    }

    private updateBet(val: number){
        this.betvalue.text = Functions.formatNumber(val);
        this.betvalue.position.x = (this.bet_box.width - this.betvalue.width) / 2;
        this.betvalue_pt.text = Functions.formatNumber(val);
        this.betvalue_pt.position.x = (this.bet_box.width - this.betvalue_pt.width) / 2;
        this.bet = val;
    }


}
