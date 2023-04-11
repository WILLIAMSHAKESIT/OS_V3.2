import * as PIXI from 'pixi.js';
import Functions from '../Functions';
import Slot from './components/Slot';
import Controller from './components/Controller';
import Niceone from './components/Niceone';
import Impressive from './components/Impressive';
import Excellent from './components/Excellent';
import Congrats from './components/Congrats';
import Bonus from './Bonus';
import gsap from 'gsap';
import {Howler} from 'howler';

export default class MainGame {
    private switchtheme: Boolean = false;
    private lastround: Boolean = false;
    private bonustotalspin: number = 0;
    private bonustotalwin: number = 0;
    private top_bg: PIXI.Sprite;
    private bubbles: Array<any> = [];
    private starfish: Array<any> = [];
    private protection: number = 0;
    private protection2: number = 0;
    private app:PIXI.Application;
    public container: PIXI.Container;
    private fishcontainer: PIXI.Container;
    //animates sprite
    private bluecoral: PIXI.Sprite;
    private lightrays: PIXI.AnimatedSprite;
    private sandbg: PIXI.AnimatedSprite;
    private boat: PIXI.AnimatedSprite;
    private sandreflection: PIXI.AnimatedSprite;
    private starfishanimated: PIXI.AnimatedSprite;
    private leftstickleaves1: PIXI.AnimatedSprite;
    private leftstickleaves2: PIXI.AnimatedSprite;
    private rightstickleaves1: PIXI.AnimatedSprite;
    private rightstickleaves2: PIXI.AnimatedSprite;
    private leftrock1: PIXI.Sprite;
    private leftrock2: PIXI.Sprite;
    private rightrock1: PIXI.Sprite;
    private rightrock2: PIXI.Sprite;
    private lefttube1: PIXI.Sprite;
    private righttube1: PIXI.Sprite;
    private static_left_corals: PIXI.Sprite;
    private static_right_corals: PIXI.Sprite;
    private leaves_left: PIXI.AnimatedSprite;
    private leaves_right: PIXI.AnimatedSprite;
    private green_leaves_right1: PIXI.AnimatedSprite;
    private bubblesleft: PIXI.AnimatedSprite;
    private bubblesright: PIXI.AnimatedSprite;
    //others
    private myAnimationsGSAP: any = [];
    private myAnimationsSprites: any = [];
    //components
    public slotgame: Slot;
    private controller: Controller;
    private niceonepopup: Niceone;
    private impressivepopup: Impressive;
    private excellentpopup: Excellent;
    private congratspopup: Congrats;
    private bonusComponets: Bonus;
    //slot boolean
    private playcount: number = 0;
    public autoplay: Boolean = false;
    public spintype: string = "normal";
    public startgame: Boolean = false;
    public autostop: Boolean = false;
    public autospin: Boolean = false;
    private overallticker: PIXI.Ticker;
    private openmodal: Boolean = false;
    private openmodalfreespin: Boolean = false;
    private stopbtn: PIXI.Sprite;
    private playbtn: PIXI.Sprite;
    private bubblesSprites: Array<PIXI.Sprite> = [];
    private starfishSprites: Array<PIXI.Sprite> = [];
    private bonusprize: number = 100;
    private bonusprizetext: PIXI.Text;
    private freespinboard: PIXI.Sprite;
    private freespinmodal: PIXI.Sprite;
    private freespincontainer: PIXI.Container;
    private freespinaccept: PIXI.Sprite;
    private freespinreject: PIXI.Sprite;
    private isfreespin: Boolean = false;
    private wildboardcontainer: PIXI.Container;
    private wildboardmultiplier: PIXI.Sprite;
    private wildboardmoney: PIXI.Sprite;
    private bonusoffer: number = 0;
    private isfreespinslot: Boolean = false;
    //original textures
    private org_boat: any;
    private org_leftstickleaves1: any;
    private org_leftstickleaves2: any;
    private org_rightstickleaves1: any;
    private org_rightstickleaves2: any;
    private org_leaves_left: any;
    private org_leftrock2: any;
    private org_lefttube1: any;
    private org_leftrock1: any;
    private org_rightrock2: any;
    private org_righttube1: any;
    private org_static_left_corals: any;
    private org_static_right_corals: any;
    private org_bluecoral: any;
    private org_top_bg: any;
    private org_sandbg: any;
    private org_starfishanimated: any;
    private org_sandreflection: any;
    private org_green_leaves_right1: any;
    private org_leaves_right: any;
    private org_lightrays: any;
    //sounds
    private isMute: Boolean;
    private playSound: (index: number) => void; 
    private soundStop: (index: number) => void; 
    private muteSound: (type: string, bol:Boolean) => void; 
    private soundVolume: (index: number) => void; 
    private soundOffTexture:PIXI.Sprite;
    private soundOnTexture:PIXI.Sprite;
    private ambienttoggleon: PIXI.Sprite;
    private ambienttoggleoff: PIXI.Sprite;
    private soundfxbtnon: PIXI.Sprite;
    private soundfxbtnoff: PIXI.Sprite;

    constructor(app: PIXI.Application, playSound: (index: number) => void, soundStop: (index: number) => void,  muteSound: (type: string, bol:Boolean) => void, isMute:Boolean, soundVolume:(index:number)=>void,) {
        this.app = app;
        this.container = new PIXI.Container();
        this.fishcontainer = new PIXI.Container();
        this.stopbtn = Functions.loadSprite(this.app.loader, 'controllers', 'pause.png', false);
        this.playbtn = Functions.loadSprite(this.app.loader, 'controllers', 'spin_button.png', false);
        this.soundOffTexture = Functions.loadSprite(this.app.loader, 'controllers', 'sound_off.png', false);
        this.soundOnTexture = Functions.loadSprite(this.app.loader, 'controllers', 'sound_on.png', false);
        this.playSound = playSound;
        this.soundStop = soundStop;
        this.muteSound = muteSound;
        this.soundVolume = soundVolume;
        this.isMute = isMute;
        this.ambienttoggleon = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'toggle_on.png', false);
        this.ambienttoggleoff = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'toggle_off.png', false);
        this.soundfxbtnon = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'toggle_on.png', false);
        this.soundfxbtnoff = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'toggle_off.png', false);
        this.init();
    }

    private init(){  
        this.overallticker = new PIXI.Ticker();
        this.overallticker.autoStart = false;
        this.overallticker.add(this.allAnimations.bind(this));
        this.overallticker.start();
        this.createBackground();
        this.createSlot();
        this.createController();
        this.createFreeSpinBoard();
        this.container.alpha = 0;
        window.document.addEventListener('keypress', e => this.quickPlay());

        if(this.isMute){
            this.controller.sound_button.texture = this.soundOnTexture.texture;
        }else{
            this.controller.sound_button.texture = this.soundOffTexture.texture;
           
        }

        document.addEventListener("visibilitychange", ()=> {
            if (document.hidden){
                Howler.mute(true)
            } else {
                if(this.controller.sound_button.texture == this.soundOnTexture.texture)
                Howler.mute(false)
            }
        });
    }

    private checkSounds(isCheck: Boolean){
        if(!isCheck){
            this.controller.sound_button.texture = this.soundOnTexture.texture
            Howler.mute(false)
        }else{
            this.controller.sound_button.texture = this.soundOffTexture.texture
            Howler.mute(true)
        }
    }

    private createNiceOne(win: number){
        if(!this.isfreespinslot){
            this.openmodal = true;
        }
        else{
            this.openmodalfreespin = true;
            
        }
        this.controller.mybuttons.forEach(element => {
            element.interactive = false;
            element.buttonMode = false;
        });
        this.niceonepopup = new Niceone(this.app, this.openModalInPopup.bind(this), win, this.soundStop.bind(this), this.soundVolume.bind(this));
        this.container.addChild(this.niceonepopup.container);
        this.playSound(25);
        this.soundVolume(25);
    }

    private createImpressive(win: number){
        if(!this.isfreespinslot){
            this.openmodal = true;
        }
        else{
            this.openmodalfreespin = true;
            
        }
        this.controller.mybuttons.forEach(element => {
            element.interactive = false;
            element.buttonMode = false;
        });
        this.impressivepopup = new Impressive(this.app, this.openModalInPopup.bind(this), win, this.soundStop.bind(this), this.soundVolume.bind(this));
        this.container.addChild(this.impressivepopup.container);
        this.playSound(25);
        this.soundVolume(25);
    }

    private createExcellent(win: number){
        if(!this.isfreespinslot){
            this.openmodal = true;
        }
        else{
            this.openmodalfreespin = true;
            
        }
        this.controller.mybuttons.forEach(element => {
            element.interactive = false;
            element.buttonMode = false;
        });
        this.excellentpopup = new Excellent(this.app, this.openModalInPopup.bind(this), win, this.soundStop.bind(this), this.soundVolume.bind(this));
        this.container.addChild(this.excellentpopup.container);
        this.playSound(25);
        this.soundVolume(25);
    }

    private createController(){
        this.controller = new Controller(this.app, this.openModal.bind(this), this.setAutoPlay.bind(this), this.updateBonusPrize.bind(this), this.playSound.bind(this), this.muteSound.bind(this), this.isMute,this.checkSounds.bind(this));
        this.container.addChild(this.controller.container);
        this.controller.info_button.addListener("mouseover", () => {
            this.playSound(6)
        })
        
        this.controller.menu_button.addListener("mouseover", () => {
            this.playSound(6)
        })
        
        this.controller.sound_button.addListener("mouseover", () => {
            this.playSound(6)
        })
        this.controller.sound_button.addListener("pointerdown", () => {
            if(this.controller.sound_button.texture == this.soundOnTexture.texture){
                this.controller.sound_button.texture = this.soundOffTexture.texture;
                //Howler.mute(true)
                this.muteSound('all', true);
                this.playSound(9)
                this.controller.modalmenu.ambientbtn.texture = this.ambienttoggleoff.texture;
                this.controller.modalmenu.soundfxbtn.texture = this.soundfxbtnoff.texture;

            }else{
                this.controller.sound_button.texture = this.soundOnTexture.texture;
                Howler.mute(false)
                this.controller.modalmenu.ambientbtn.texture = this.ambienttoggleon.texture;
                this.controller.modalmenu.soundfxbtn.texture = this.soundfxbtnon.texture;
                this.muteSound('all', false);
                this.playSound(9)
            }
        });

        //events
        this.controller.singleplay_button.addListener("pointerdown", () => {
            this.playSound(9)
            if(this.autoplay){
                if(!this.slotgame.startreel){
                    this.autostop = true;
                }
                if(this.slotgame.enlargecharacters){
                    this.autospin = true;
                    this.slotgame.enlarge.duration(.01);
                    this.slotgame.paylineanimation.forEach(element => {
                        element.duration(.01);
                        element.delay(.01);
                    });
                }
                this.stopAutoPlay();
            }
            else{
                this.quickPlay();
            }
        });
    }

    private openModal(bool: Boolean){
        this.openmodal = bool;
    }

    private openModalInPopup(bool: Boolean){
        if(!this.isfreespinslot){
            this.openmodal = bool;
        }
        else{
            this.openmodalfreespin = bool;
        }
        if(!this.isfreespinslot){
            this.controller.mybuttons.forEach(element => {
                element.interactive = true;
                element.buttonMode = true;
            });
        }
    }

    private setButtonsBoolean(bool: boolean){
        if(!this.isfreespinslot){
            this.controller.autoplay_button.interactive = bool;
            this.controller.autoplay_button.buttonMode = bool;
            this.controller.info_button.interactive = bool;
            this.controller.info_button.buttonMode = bool;
            this.controller.menu_button.interactive = bool;
            this.controller.menu_button.buttonMode = bool;
            this.freespinboard.interactive = bool;
            this.freespinboard.buttonMode = bool;
        }
    }

    private setTrueButtonsAfterSpin(){
        if(!this.autoplay){
            this.setButtonsBoolean(true)
        }
    }

    private createSlot(){
        this.slotgame = new Slot(this.app, this.updateBottomPayline.bind(this), this.updateBottomPayline2.bind(this), this.changeButton.bind(this), this.updateTopPayline.bind(this), this.setAutoSpinText.bind(this), this.updateBalanceDecrease.bind(this), this.setTrueButtonsAfterSpin.bind(this), this.updateBalanceIncrease.bind(this), this.bonusGame.bind(this), this.congratsPopup.bind(this), this.playSound.bind(this), this.soundStop.bind(this));
        this.container.addChild(this.slotgame.container);
        this.playSound(26);
        this.soundStop(1);
    }

    private createWildsBoard(){
        this.wildboardcontainer = new PIXI.Container();
        this.wildboardmultiplier = Functions.loadSprite(this.app.loader, 'new_controllers', 'multiplier_wilds.png', false);
        this.wildboardmoney = Functions.loadSprite(this.app.loader, 'new_controllers', 'money_wilds.png', false);
        const style = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 160,
            fontWeight: 'bold',
            fill: ['#FFE966', '#FFB34F'], // gradient
            stroke: '#5F2F27',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#5F2F27',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 4,
            dropShadowDistance: 15,
            lineJoin: 'round',
        });
        const wildtext = new PIXI.Text(this.bonusoffer, style);
        const moneytext = new PIXI.Text(this.bonusoffer, style);
        //add child
        this.wildboardcontainer.addChild(this.wildboardmultiplier);
        this.wildboardcontainer.addChild(this.wildboardmoney);
        this.app.stage.addChild(this.wildboardcontainer);
        this.wildboardmultiplier.addChild(wildtext);
        this.wildboardmoney.addChild(moneytext);
        //positions
        wildtext.x = (this.wildboardmultiplier.width - wildtext.width) / 2;
        wildtext.y = ((this.wildboardmultiplier.height - wildtext.height) / 2) + 20;
        moneytext.x = (this.wildboardmoney.width - moneytext.width) / 2;
        moneytext.y = ((this.wildboardmoney.height - moneytext.height) / 2) + 20;
        this.wildboardmoney.x = this.wildboardmultiplier.x + this.wildboardmultiplier.width + 100;
        this.wildboardcontainer.x = (this.app.screen.width - this.wildboardcontainer.width) / 2;
        this.wildboardcontainer.y = (this.app.screen.height - this.wildboardcontainer.height) / 2;
        //events
        this.wildboardmultiplier.interactive = true;
        this.wildboardmultiplier.buttonMode = true;
        this.wildboardmoney.interactive = true;
        this.wildboardmoney.buttonMode = true;

        this.wildboardmultiplier.addListener("pointerdown", () => {
            this.playSound(9)
            this.app.stage.removeChild(this.wildboardcontainer);
            this.slotgame.charAssets = [
                { type : 0, value : 'slot_letter_k'},
                { type : 1, value : 'slot_letter_a'},
                { type : 2, value : 'slot_turtle'},
                { type : 3, value : 'slot_sea_horse'},
                { type : 4, value : 'slot_penguin'},
                { type : 5, value : 'slot_walrus'},
                { type : 6, value : 'slot_octopus'},
                { type : 7, value : 'slot_x2'},
                { type : 8, value : 'slot_x3'},
                { type : 9, value : 'slot_x5'},
                { type : 10, value : 'slot_wild'}
            ];
            
            this.createStarFish();
            this.animateStarFish();
            this.createBubbles();
            this.animateBubbles();
            this.transitionStarfish(true);
        });
        this.wildboardmoney.addListener("pointerdown", () => {
            this.playSound(9)
            this.app.stage.removeChild(this.wildboardcontainer);
            this.slotgame.charAssets = [
                { type : 0, value : 'slot_letter_k'},
                { type : 1, value : 'slot_letter_a'},
                { type : 2, value : 'slot_turtle'},
                { type : 3, value : 'slot_sea_horse'},
                { type : 4, value : 'slot_penguin'},
                { type : 5, value : 'slot_walrus'},
                { type : 6, value : 'slot_octopus'},
                { type : 7, value : 'slot_2k'},
                { type : 8, value : 'slot_3k'},
                { type : 9, value : 'slot_5k'},
                { type : 10, value : 'slot_wild'}
            ];     
            this.createStarFish();
            this.animateStarFish();
            this.createBubbles();
            this.animateBubbles();
            this.transitionStarfish(true);
        });
    }

    private createFreeSpinBoard(){
        this.freespinboard = Functions.loadSprite(this.app.loader, 'new_controllers', 'get_free_spins.png', false);
        this.freespinboard.interactive = true;
        this.freespinboard.buttonMode = true;
        this.controller.mybuttons.push(this.freespinboard);
        this.freespinboard.scale.set(.9);
        this.freespinboard.x = 10;
        this.freespinboard.y = (this.container.height - this.freespinboard.height) / 2;
        this.container.addChild(this.freespinboard);

        const style = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 65,
            fontWeight: 'bold',
            fill: '#4d3300'
        });

        this.bonusprizetext = new PIXI.Text(this.bonusprize.toLocaleString(), style);
        this.bonusprizetext.x = ((this.freespinboard.width - this.bonusprizetext.width) / 2) + 5;
        this.bonusprizetext.y = 255;
        this.freespinboard.addChild(this.bonusprizetext);

        this.freespinboard.addListener("pointerdown", () => {
            this.playSound(9)
            this.controller.mybuttons.forEach(element => {
               element.interactive = false;
               element.buttonMode = false;
            });
            this.openmodal = true;
            this.freeSpinModal();
        });
    }

    private freeSpinModal(){
        this.freespincontainer = new PIXI.Container();
        this.freespinmodal = Functions.loadSprite(this.app.loader, 'new_controllers', 'free_spin_popup.png', false);
        this.freespinaccept = Functions.loadSprite(this.app.loader, 'new_controllers', 'check_free_spin.png', false);
        this.freespinreject = Functions.loadSprite(this.app.loader, 'new_controllers', 'ex_free_spin.png', false);
        const style = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 150,
            fontWeight: 'bold',
            fill: '#4d3300'
        });
        const bonusprizetext = new PIXI.Text(this.bonusprize.toLocaleString(), style);
        //add child
        this.freespincontainer.addChild(this.freespinmodal);
        this.freespincontainer.addChild(this.freespinaccept);
        this.freespincontainer.addChild(this.freespinreject);
        this.freespincontainer.addChild(bonusprizetext);
        this.app.stage.addChild(this.freespincontainer);
        //interactive
        this.freespinaccept.interactive = true;
        this.freespinaccept.buttonMode = true;
        this.freespinreject.interactive = true;
        this.freespinreject.buttonMode = true;
        //position
        bonusprizetext.x = (this.freespincontainer.width - bonusprizetext.width) / 2;
        bonusprizetext.y = ((this.freespincontainer.height - bonusprizetext.height) / 2) + 135;
        this.freespinaccept.y = bonusprizetext.y + bonusprizetext.height + 5;
        this.freespinaccept.x = 70;
        this.freespinreject.y = this.freespinaccept.y;
        this.freespinreject.x = this.freespincontainer.width - this.freespinreject.width - this.freespinaccept.x;
        this.freespincontainer.x = (this.app.screen.width - this.freespincontainer.width) / 2;
        this.freespincontainer.y = (this.app.screen.height - this.freespincontainer.height) / 2;

        //event
        this.freespinreject.addListener("pointerdown", () => {
            this.playSound(9)
            this.controller.mybuttons.forEach(element => {
                element.interactive = true;
                element.buttonMode = true;
            });
            this.openmodal = false;
            this.app.stage.removeChild(this.freespincontainer);
        });

        this.freespinaccept.addListener("pointerdown", () => {
            this.playSound(9)
            // this.controller.mybuttons.forEach(element => {
            //     element.interactive = true;
            //     element.buttonMode = true;
            // });
            this.openmodal = false;
            this.isfreespin = true;
            this.app.stage.removeChild(this.freespincontainer);
            this.slotgame.reelscontainer.forEach(element => {
                element.removeChildren();
            });
            let reelvalue = [
                [1,9,2,3,1,11,4,3,9,2,4,8,1,2,11,5,9,1,5,9,2,6,8,6,9,3,9,7,1,7],
                [5,2,4,1,4,5,9,6,11,1,6,8,3,9,2,1,9,4,3,1,11,7,8,2,11,1,3,2,9,7],
                [1,5,9,11,4,1,2,5,2,2,8,1,6,9,4,3,9,2,11,6,7,1,7,3,2,3,1,8,3,5],
                [1,5,2,3,1,4,11,3,2,5,9,4,2,1,8,4,1,8,9,3,8,1,8,11,7,6,2,9,7,6],
                [1,5,5,9,6,2,4,1,3,8,6,1,11,4,3,2,7,9,9,2,7,3,9,1,8,2,9,1,8,8]
            ];
            let tmpbonusgame = Functions.getRandomInt(1,5);
            let bonusgame = Math.round(tmpbonusgame);
            if(bonusgame <= 3){
                bonusgame = 3;
            }
            if(bonusgame == 3){
                for(let i = 0; i < 3; i++){
                    let tmpindex = Functions.getRandomInt(27,29);
                    let index = Math.round(tmpindex);
                    reelvalue[i][index] = 10;
                }
            }
            else if(bonusgame == 4){
                for(let i = 0; i < 4; i++){
                    let tmpindex = Functions.getRandomInt(27,29);
                    let index = Math.round(tmpindex);
                    reelvalue[i][index] = 10;
                }
            }
            else{
                for(let i = 0; i < 5; i++){
                    let tmpindex = Functions.getRandomInt(27,29);
                    let index = Math.round(tmpindex);
                    reelvalue[i][index] = 10;
                }
            }

            this.slotgame.createBlocksBonusGame(reelvalue);
            this.quickPlay();
        });
    }

    private updateBonusPrize(val: number){
        this.bonusprize = 100 * val;
        this.bonusprizetext.text = this.bonusprize.toLocaleString();
        this.bonusprizetext.x = ((this.freespinboard.width - this.bonusprizetext.width) / 2) + 5;
    }

    private updateBottomPayline(text: any){
        this.controller.paylinebottomcontainer.removeChildren();
        this.controller.paylinetext.text = text;
        this.controller.paylinebottomcontainer.addChild(this.controller.paylinetext);
        this.controller.paylinebottomcontainer.position.x = (this.controller.controller_parent.width - this.controller.paylinebottomcontainer.width) / 2;
    }

    private updateTopPayline(text: any){
        this.controller.paylinetopcontainer.removeChildren();
        this.controller.tapspacetext.text = text;
        this.controller.paylinetopcontainer.addChild(this.controller.tapspacetext);
        this.controller.paylinetopcontainer.position.x = (this.controller.controller_parent.width - this.controller.paylinetopcontainer.width) / 2;
    }

    private updateBottomPayline2(paylines_symbols: any, paylines_pay: any, pattern: any){
        this.controller.paylinetopcontainer.removeChildren();
        let posx = 0;
        const newcontainer = new PIXI.Container();
        paylines_symbols.forEach((element : any) => {
            element.width = Functions.scaleSizeFixedHeight(60, element)
            element.height = 60;
            element.position.x = posx;
            newcontainer.addChild(element);
            posx += (element.width + 1);
        });
        const newstyle = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 30,
            fontWeight: 'bold',
            fill: '#FFFFFF'
        });
        this.controller.paylinetopcontainer.addChild(newcontainer);
        let tmp = parseFloat(paylines_pay.toFixed(2));
        const newtext = new PIXI.Text(`LINE ${pattern} PAYS ${tmp}`, newstyle);
        this.controller.paylinetopcontainer.addChild(newtext);
        newtext.y = (this.controller.paylinetopcontainer.height - newtext.height) / 2;
        newtext.x = newcontainer.x + newcontainer.width + 5;
        
        this.controller.paylinetopcontainer.position.x = (this.controller.controller_parent.width - this.controller.paylinetopcontainer.width) / 2;
    }

    private createBackground(){
        //background
        this.top_bg = Functions.loadSprite(this.app.loader, 'spritesgamescene', 'gamebg.jpg', false);
        this.top_bg.width = this.app.screen.width;
        this.top_bg.height = this.app.screen.height;
        this.container.addChild(this.top_bg);

        //light rays
        this.lightrays = Functions.loadSprite(this.app.loader, 'top_rays', '', true);
        this.lightrays.width = this.app.screen.width;
        this.lightrays.animationSpeed = .2;
        this.lightrays.play();
        this.myAnimationsSprites.push(this.lightrays);
        this.container.addChild(this.lightrays);

        //boat
        this.boat = Functions.loadSprite(this.app.loader, 'boat', '', true);
        this.boat.animationSpeed = .2;
        this.boat.position.y = this.app.screen.height / 6;
        this.boat.position.x = (this.app.screen.width / 2) - (this.boat.width / 2);
        this.boat.play();
        this.myAnimationsSprites.push(this.boat);
        this.container.addChild(this.boat);

        //fishes
        this.fishcontainer = new PIXI.Container();
        this.createFishLeft();
        this.container.addChild(this.fishcontainer);
        
        //sand bg
        this.sandbg = Functions.loadSprite(this.app.loader, 'spritesgamescene', 'sand.png', false);
        this.sandbg.height = Functions.scaleSizeFixedWidth(this.app.screen.width, this.sandbg);
        this.sandbg.width = this.app.screen.width;
        this.sandbg.position.y = this.app.screen.height - this.sandbg.height
        this.container.addChild(this.sandbg);

        //sand refelction
        this.sandreflection = Functions.loadSprite(this.app.loader, 'sandreflection', '', true);
        this.sandreflection.height = Functions.scaleSizeFixedWidth(this.app.screen.width, this.sandreflection);
        this.sandreflection.width = this.app.screen.width;
        this.sandreflection.play();
        this.myAnimationsSprites.push(this.sandreflection);
        this.sandreflection.animationSpeed = .1;
        this.sandreflection.position.y = this.app.screen.height - this.sandreflection.height
        this.container.addChild(this.sandreflection);

        //star fish
        this.starfishanimated = Functions.loadSprite(this.app.loader, 'star_fish_animated', '', true);
        this.starfishanimated.animationSpeed = .15;
        this.starfishanimated.position.y = 900;
        this.starfishanimated.position.x = 800;
        this.starfishanimated.play();
        this.myAnimationsSprites.push(this.starfishanimated);
        this.container.addChild(this.starfishanimated);

        //corals
        this.createLeftCorals();
        this.createRightCorals();
    }

    private quickPlay(){
        if(!this.switchtheme){
            if(this.isfreespinslot){
                if(!this.slotgame.startreel){
                    this.autostop = true;
                }
                if(this.slotgame.enlargecharacters){
                    let popup = this.checkPopUp(this.slotgame.newtotal, this.controller.bet);
                    if(popup == 0 && !this.slotgame.isbonus){
                        this.autospin = true;
                    }
                    this.slotgame.enlarge.duration(.01);
                    this.slotgame.paylineanimation.forEach(element => {
                        element.duration(.01);
                        element.delay(.01);
                    });
                }
            }
            else{
                if(!this.openmodal){
                    if(this.autoplay){
                        if(!this.slotgame.startreel){
                            this.autostop = true;
                        }
                        if(this.slotgame.enlargecharacters){
                            let popup = this.checkPopUp(this.slotgame.newtotal, this.controller.bet);
                            if(popup == 0 && !this.slotgame.isbonus){
                                this.autospin = true;
                            }
                            this.slotgame.enlarge.duration(.01);
                            this.slotgame.paylineanimation.forEach(element => {
                                element.duration(.01);
                                element.delay(.01);
                            });
                        }
                    }
                    else{
                        if(this.controller.bet <= this.controller.balance){
                            this.setButtonsBoolean(false);
                            if(!this.slotgame.startreel){
                                this.autostop = true;
                            }
                            if(this.slotgame.enlargecharacters){
                                let popup = this.checkPopUp(this.slotgame.newtotal, this.controller.bet);
                                if(popup == 0 && !this.slotgame.isbonus){
                                    this.autospin = true;
                                }
                                this.slotgame.enlarge.duration(.01);
                                this.slotgame.paylineanimation.forEach(element => {
                                    element.duration(.01);
                                    element.delay(.01);
                                });
                            }
                            this.controller.singleplay_button.texture = this.stopbtn.texture;
                            this.slotgame.reelsAnimation(this.controller.bet, this.controller.modalautoplay.spintype);
                        }
                    }
                }
            }
        }
    }

    private bonusGame(arr1: any, arr2: any){
        this.stopMyanimations();
        this.openmodal = true;
        this.controller.mybuttons.forEach(element => {
            element.interactive = false;
            element.buttonMode = false;
        });
        this.createBubbles();
        this.animateBubbles();
        this.transitionBubbles();
        this.createBonus(arr1, arr2);
    }

    private createBonus(arr1: any, arr2: any){
        this.bonusComponets = new Bonus(this.app, arr1, arr2, this.container, this.bonusGameDone.bind(this), this.playSound.bind(this));
        this.bonusComponets.container.alpha = 0;
        this.app.stage.addChild(this.bonusComponets.container);
    }

    private createStarFish(){

        while(this.starfish.length < 300){
            let star = {
                x: Math.round(Functions.getRandomInt(-100, this.app.screen.width)),
                y: Math.round(Functions.getRandomInt(-100, this.app.screen.height)),
                size: Math.round(Functions.getRandomInt(80, 450))
            }

            let overlapping = false;
            for(let j = 0; j < this.starfish.length; j++){
                let other = this.starfish[j];
                if (star.x < other.x + other.size &&
                    star.x + star.size > other.x &&
                    star.y < other.y + other.size &&
                    star.size + star.y > other.y) {
                    overlapping = true;
                    break;
                 }
            }

            if(!overlapping){
                this.starfish.push(star);
            }

            this.protection2++;
            if(this.protection2 > 10000){
                break;
            }
        }
    }

    private animateStarFish(){
        let duration = 4;
        let starfisharr = ['p1.png','p2.png','v1.png','v2.png','y1.png','y2.png','y3.png']
        this.starfish.forEach((element, index) => {
            let interval = duration * index;
            let show = setTimeout(() => {
                const starimg = starfisharr[Math.floor(Math.random()*starfisharr.length)];
                const sprite = Functions.loadSprite(this.app.loader, 'new_controllers', starimg, false);
                sprite.width = element.size;
                sprite.height = element.size;
                sprite.x = element.x;
                sprite.y = element.y;
                this.starfishSprites.push(sprite);
                this.app.stage.addChild(sprite);
                clearTimeout(show);
            }, interval);
        });
    }

    private changeBackground(bool: Boolean){
        if(bool){
            this.soundStop(26);
            this.playSound(23);
            this.isfreespinslot = true;
            this.slotgame.isbonusgame = true;

            //new texture
            const boat_dark = Functions.loadSprite(this.app.loader, 'boat_dark', '', true);
            const leftstickleaves1_dark = Functions.loadSprite(this.app.loader, 'leftstickleaves1_dark', '', true);
            const leftstickleaves2_dark = Functions.loadSprite(this.app.loader, 'leftstickleaves2_dark', '', true);
            const leaves_left_dark = Functions.loadSprite(this.app.loader, 'dark_leaves_left_animated', '', true);
            const starfishanimated_dark = Functions.loadSprite(this.app.loader, 'dark_star_fish_animated', '', true);
            const sandreflection_dark = Functions.loadSprite(this.app.loader, 'dark_sandreflection', '', true);
            const rightstickleaves1_dark = Functions.loadSprite(this.app.loader, 'dark_rightstickleaves1', '', true);
            const rightstickleaves2_dark = Functions.loadSprite(this.app.loader, 'dark_rightstickleaves2', '', true);
            const green_leaves_right1_dark = Functions.loadSprite(this.app.loader, 'dark_green_leaves_right', '', true);
            const leaves_right_dark = Functions.loadSprite(this.app.loader, 'dark_leaves_right_animated', '', true);
            const lightrays_dark = Functions.loadSprite(this.app.loader, 'dark_top_rays', '', true);
            const leftrock2_dark = Functions.loadSprite(this.app.loader, 'dark_static_rocks', 'dark_Left_rock_2nd.png', false);
            const lefttube1_dark = Functions.loadSprite(this.app.loader, 'dark_static_rocks', 'dark_Left_tube_coral_1.png', false);
            const leftrock1_dark = Functions.loadSprite(this.app.loader, 'dark_static_rocks', 'dark_Left_rock_front.png', false);
            const rightrock2_dark = Functions.loadSprite(this.app.loader, 'dark_static_rocks', 'dark_right_rock_front.png', false);
            const righttube1_dark = Functions.loadSprite(this.app.loader, 'dark_static_rocks', 'dark_right_tube.png', false);
            const static_left_corals_dark = Functions.loadSprite(this.app.loader, 'dark_static_corals', 'dark_Left_rock_corals.png', false);
            const static_right_corals_dark = Functions.loadSprite(this.app.loader, 'dark_static_corals', 'dark_right_rock_corals.png', false);
            const bluecoral_dark = Functions.loadSprite(this.app.loader, 'dark_static_corals', 'dark_right_coral_2.png', false);
            const top_bg_dark = Functions.loadSprite(this.app.loader, 'dark_spritesgamescene', 'dark_gamebg.png', false);
            const sandbg_dark = Functions.loadSprite(this.app.loader, 'dark_spritesgamescene', 'dark_sand.png', false);
            //save old
            this.org_boat = this.boat.textures;
            this.org_leftstickleaves1 = this.leftstickleaves1.textures;
            this.org_leftstickleaves2 = this.leftstickleaves2.textures;
            this.org_leaves_left = this.leaves_left.textures;
            this.org_starfishanimated = this.starfishanimated.textures;
            this.org_sandreflection = this.sandreflection.textures;
            this.org_rightstickleaves1 = this.rightstickleaves1.textures;
            this.org_rightstickleaves2 = this.rightstickleaves2.textures;
            this.org_green_leaves_right1 = this.green_leaves_right1.textures;
            this.org_lightrays = this.lightrays.textures;
            this.org_leaves_right = this.leaves_right.textures;
            this.org_leftrock2 = this.leftrock2.texture;
            this.org_lefttube1 = this.lefttube1.texture;
            this.org_leftrock1 = this.leftrock1.texture;
            this.org_rightrock2 = this.rightrock2.texture;
            this.org_righttube1 = this.righttube1.texture;
            this.org_static_left_corals = this.static_left_corals.texture;
            this.org_static_right_corals = this.static_right_corals.texture;
            this.org_bluecoral = this.bluecoral.texture;
            this.org_top_bg = this.top_bg.texture;
            this.org_sandbg = this.sandbg.texture;
            //set new
            this.boat.textures = boat_dark.textures;
            this.leftstickleaves1.textures = leftstickleaves1_dark.textures;
            this.leftstickleaves2.textures = leftstickleaves2_dark.textures;
            this.leaves_left.textures = leaves_left_dark.textures;
            this.starfishanimated.textures = starfishanimated_dark.textures;
            this.sandreflection.textures = sandreflection_dark.textures;
            this.rightstickleaves1.textures = rightstickleaves1_dark.textures;
            this.rightstickleaves2.textures = rightstickleaves2_dark.textures;
            this.green_leaves_right1.textures = green_leaves_right1_dark.textures;
            this.leaves_right.textures = leaves_right_dark.textures;
            this.lightrays.textures = lightrays_dark.textures;
            this.leftrock2.texture = leftrock2_dark.texture;
            this.lefttube1.texture = lefttube1_dark.texture;
            this.leftrock1.texture = leftrock1_dark.texture;
            this.rightrock2.texture = rightrock2_dark.texture;
            this.righttube1.texture = righttube1_dark.texture;
            this.static_left_corals.texture = static_left_corals_dark.texture;
            this.static_right_corals.texture = static_right_corals_dark.texture;
            this.bluecoral.texture = bluecoral_dark.texture;
            this.top_bg.texture = top_bg_dark.texture;
            this.sandbg.texture = sandbg_dark.texture;

            this.slotgame.reelscontainer.forEach(element => {
                element.removeChildren();
            });
            this.slotgame.createBlocksFreeSpin();
        }
        else{
            this.isfreespinslot = false;
            this.openmodal = false;
            this.openmodalfreespin = false;
            this.setAutoSpinText();
            this.slotgame.reelscontainer.forEach(element => {
                element.removeChildren();
            });
            this.slotgame.charAssets = [
                { type : 0, value : 'slot_letter_j'},
                { type : 1, value : 'slot_letter_k'},
                { type : 2, value : 'slot_letter_a'},
                { type : 3, value : 'slot_turtle'},
                { type : 4, value : 'slot_sea_horse'},
                { type : 5, value : 'slot_penguin'},
                { type : 6, value : 'slot_walrus'},
                { type : 7, value : 'slot_octopus'},
                { type : 8, value : 'slot_mega'},
                { type : 9, value : 'slot_bonus'},
                { type : 10, value : 'slot_wild'}
            ];
            this.controller.mybuttons.forEach(element => {
                element.interactive = true;
                element.buttonMode = true;
            });
            this.slotgame.isbonusgame = false;
            this.slotgame.createBlocksFreeSpin();
            this.soundStop(23);
            this.playSound(26);
            //back to old
            this.boat.textures = this.org_boat;
            this.leftstickleaves1.textures = this.org_leftstickleaves1;
            this.leftstickleaves2.textures = this.org_leftstickleaves2;
            this.leaves_left.textures = this.org_leaves_left;
            this.starfishanimated.textures = this.org_starfishanimated;
            this.sandreflection.textures = this.org_sandreflection;
            this.rightstickleaves1.textures = this.org_rightstickleaves1;
            this.rightstickleaves2.textures = this.org_rightstickleaves2;
            this.green_leaves_right1.textures = this.org_green_leaves_right1;
            this.leaves_right.textures = this.org_leaves_right;
            this.lightrays.textures = this.org_lightrays;
            this.leftrock2.texture = this.org_leftrock2;
            this.lefttube1.texture = this.org_lefttube1;
            this.leftrock1.texture = this.org_leftrock1;
            this.rightrock2.texture = this.org_rightrock2;
            this.righttube1.texture = this.org_righttube1;
            this.static_left_corals.texture = this.org_static_left_corals;
            this.static_right_corals.texture = this.org_static_right_corals;
            this.bluecoral.texture = this.org_bluecoral;
            this.top_bg.texture = this.org_top_bg;
            this.sandbg.texture = this.org_sandbg;
        }
        this.boat.play();
        this.leftstickleaves1.play();
        this.leftstickleaves2.play();
        this.leftstickleaves2.play();
        this.starfishanimated.play();
        this.sandreflection.play();
        this.rightstickleaves1.play();
        this.rightstickleaves2.play();
        this.green_leaves_right1.play();
        this.leaves_left.play();
        this.leaves_right.play();
    }

    private transitionStarfish(bool: Boolean){
        this.switchtheme = true;
        let transition = gsap.to(this.container, {
            alpha: 0,
            duration: 1.3,
            ease: "sine.in",
            onComplete: () => {
                this.changeBackground(bool);
                this.bubblesSprites.forEach((element, index) => {
                    let delay = .005 * index;
                    let gsapper = gsap.to(element, {
                        delay: delay,
                        duration: .05,
                        alpha: 0,
                        onStart: () => {
                            if(index == 0){
                                let transition2 = gsap.to(this.container, {
                                    alpha: 1,
                                    duration: 1.5,
                                    ease: "sine.out",
                                    onComplete: () => {
                                        // let settimeout = setTimeout(() => {
                                        //     console.log('wow')
                                            
                                        //     clearTimeout(settimeout);
                                        // }, 1500);
                                        transition2.kill();
                                    }
                                });
                            }
                        },
                        onComplete: () =>{
                            this.app.stage.removeChild(element);
                            if(index == this.bubblesSprites.length - 1){
                                this.switchtheme = false;
                                this.protection = 0;
                                this.bubbles = [];
                                this.bubblesSprites = [];
                            }
                            gsapper.kill();
                        }
                    });
                });
                this.starfishSprites.forEach((element, index) => {
                    let delay = .005 * index;
                    let gsapper = gsap.to(element, {
                        delay: delay,
                        duration: .05,
                        alpha: 0,
                        onComplete: () =>{
                            this.app.stage.removeChild(element);
                            if(index == this.starfishSprites.length - 1){
                                this.protection2 = 0;
                                this.starfish = [];
                                this.starfishSprites = [];
                            }
                            gsapper.kill();
                        }
                    });
                });
                transition.kill();
            }
        });
    }

    private transitionBubbles(){
        let transition = gsap.to(this.container, {
            alpha: 0,
            duration: 1.3,
            ease: "sine.in",
            onComplete: () => {
                this.bubblesSprites.forEach((element, index) => {
                    let delay = .005 * index;
                    let gsapper = gsap.to(element, {
                        delay: delay,
                        duration: .05,
                        alpha: 0,
                        onStart: () => {
                            if(index == 0){
                                let transition2 = gsap.to(this.bonusComponets.container, {
                                    alpha: 1,
                                    duration: 1.5,
                                    ease: "sine.out",
                                    onComplete: () => {
                                        transition2.kill();
                                    }
                                });
                            }
                        },
                        onComplete: () =>{
                            this.app.stage.removeChild(element);
                            if(index == this.bubblesSprites.length - 1){
                                this.protection = 0;
                                this.bubbles = [];
                                this.bubblesSprites = [];
                            }
                            gsapper.kill();
                        }
                    });
                });
                transition.kill();
            }
        });
    }

    private createBubbles(){
        this.playSound(27)
        while(this.bubbles.length < 300){
            let bubble = {
                x: Math.round(Functions.getRandomInt(-100, this.app.screen.width)),
                y: Math.round(Functions.getRandomInt(-100, this.app.screen.height)),
                size: Math.round(Functions.getRandomInt(50, 350))
            }

            let overlapping = false;
            for(let j = 0; j < this.bubbles.length; j++){
                let other = this.bubbles[j];
                if (bubble.x < other.x + other.size &&
                    bubble.x + bubble.size > other.x &&
                    bubble.y < other.y + other.size &&
                    bubble.size + bubble.y > other.y) {
                    overlapping = true;
                    break;
                 }
            }

            if(!overlapping){
                this.bubbles.push(bubble);
            }

            this.protection++;
            if(this.protection > 10000){
                break;
            }
        }
    }

    private animateBubbles(){
        let duration = 4;
        this.bubbles.forEach((element, index) => {
            let interval = duration * index;
            let show = setTimeout(() => {
                const sprite = Functions.loadSprite(this.app.loader, 'spritesgamescene', 'bubble.png', false);
                sprite.width = element.size;
                sprite.height = element.size;
                sprite.x = element.x;
                sprite.y = element.y;
                this.bubblesSprites.push(sprite);
                this.app.stage.addChild(sprite);
                clearTimeout(show);
            }, interval);
        });
    }

    private bonusGameDone(offer: number){
        this.startMyanimations();
        // this.openmodal = false;
        // this.controller.mybuttons.forEach(element => {
        //     element.interactive = true;
        //     element.buttonMode = true;
        // });
        this.controller.mybuttons.forEach(element => {
            element.interactive = false;
            element.buttonMode = false;
        });
        this.openmodal = true;
        this.bonusoffer = offer;
        this.bonustotalspin = offer;
        this.createWildsBoard();
    }

    private createFishLeft(){
        let fishes = [];
        while(fishes.length < 20){
            let fishsize = Math.round(Functions.getRandomInt(50, 80));
            var fish = {
                x: Math.round(Functions.getRandomInt(-(this.app.screen.width), -(fishsize))),
                y: Math.round(Functions.getRandomInt(0, this.app.screen.height)),
                size: fishsize
            }

            let overlapping = false;
            for(let j = 0; j < fishes.length; j++){
                let other = fishes[j];
                if (fish.x < other.x + other.size &&
                    fish.x + fish.size > other.x &&
                    fish.y < other.y + other.size &&
                    fish.size + fish.y > other.y) {
                    overlapping = true;
                    break;
                 }
            }

            if(!overlapping){
                fishes.push(fish);
            }
        }

        for(let i = 0; i < fishes.length; i++){
            const sprite = Functions.loadSprite(this.app.loader, 'spritesgamescene', 'bigfish.png', false);
            sprite.height =  Functions.scaleSizeFixedWidth(fishes[i].size, sprite);
            sprite.width = fishes[i].size;
            sprite.x = fishes[i].x;
            sprite.y = fishes[i].y;
            sprite.anchor.x = 1;
            sprite.scale.x *= -1;
            this.fishcontainer.addChild(sprite);

            let animation = gsap.to(sprite, {
                alpha: 0,
                duration: Math.round(Functions.getRandomInt(30, 50)),
                x: (this.app.screen.width + (this.app.screen.width / 2)) + sprite.width,
                onComplete: () => {
                    this.container.removeChild(sprite);
                    if(i == fishes.length - 1){
                        this.createFishRight();
                    }
                    animation.kill();
                }
            });
            this.myAnimationsGSAP.push(animation);
        }
    }

    private createFishRight(){
        let fishes = [];
        while(fishes.length < 20){
            let fishsize = Math.round(Functions.getRandomInt(50, 80));
            var fish = {
                x: Math.round(Functions.getRandomInt(this.app.screen.width + fishsize, this.app.screen.width * 2)),
                y: Math.round(Functions.getRandomInt(0, this.app.screen.height)),
                size: fishsize
            }

            let overlapping = false;
            for(let j = 0; j < fishes.length; j++){
                let other = fishes[j];
                if (fish.x < other.x + other.size &&
                    fish.x + fish.size > other.x &&
                    fish.y < other.y + other.size &&
                    fish.size + fish.y > other.y) {
                    overlapping = true;
                    break;
                 }
            }

            if(!overlapping){
                fishes.push(fish);
            }
        }

        for(let i = 0; i < fishes.length; i++){
            const sprite = Functions.loadSprite(this.app.loader, 'spritesgamescene', 'bigfish.png', false);
            sprite.height =  Functions.scaleSizeFixedWidth(fishes[i].size, sprite);
            sprite.width = fishes[i].size;
            sprite.x = fishes[i].x;
            sprite.y = fishes[i].y;
            this.fishcontainer.addChild(sprite);

            let animation = gsap.to(sprite, {
                alpha: 0,
                duration: Math.round(Functions.getRandomInt(30, 50)),
                x: sprite.width - (this.app.screen.width + (this.app.screen.width / 2)),
                onComplete: () => {
                    this.container.removeChild(sprite);
                    if(i == fishes.length - 1){
                        this.createFishLeft();
                    }
                    animation.kill();
                }
            });

            this.myAnimationsGSAP.push(animation);
        }
    }

    private createLeftCorals(){
        //static corals
        this.static_left_corals = Functions.loadSprite(this.app.loader, 'static_corals', 'Left_rock_corals.png', false);
        this.static_left_corals.y = 20;
        this.container.addChild(this.static_left_corals);
        //leaves left
        this.leaves_left = Functions.loadSprite(this.app.loader, 'leaves_left_animated', '', true);
        this.leaves_left.animationSpeed = .15;
        this.leaves_left.position.x = 280;
        this.leaves_left.position.y = 730;
        this.leaves_left.play();
        this.myAnimationsSprites.push(this.leaves_left);
        this.container.addChild(this.leaves_left);
        //stick leaves 2
        this.leftstickleaves2 = Functions.loadSprite(this.app.loader, 'leftstickleaves2', '', true);
        this.leftstickleaves2.animationSpeed = .15;
        this.leftstickleaves2.position.y = 530;
        this.leftstickleaves2.position.x = 20;
        this.leftstickleaves2.play();
        this.myAnimationsSprites.push(this.leftstickleaves2);
        this.container.addChild(this.leftstickleaves2);
        //stick leaves 1
        this.leftstickleaves1 = Functions.loadSprite(this.app.loader, 'leftstickleaves1', '', true);
        this.leftstickleaves1.animationSpeed = .15;
        this.leftstickleaves1.position.y = 630;
        this.leftstickleaves1.position.x = 220;
        this.leftstickleaves1.play();
        this.myAnimationsSprites.push(this.leftstickleaves1);
        this.container.addChild(this.leftstickleaves1);
        //left rock2
        this.leftrock2 = Functions.loadSprite(this.app.loader, 'static_rocks', 'Left_rock_2nd.png', false);
        this.leftrock2.position.y = 680;
        this.container.addChild(this.leftrock2);
        //left tube1
        this.lefttube1 = Functions.loadSprite(this.app.loader, 'static_rocks', 'Left_tube_coral_1.png', false);
        this.lefttube1.position.y = 730;
        this.lefttube1.position.x = 20;
        this.container.addChild(this.lefttube1);
        //left rock1
        this.leftrock1 = Functions.loadSprite(this.app.loader, 'static_rocks', 'Left_rock_front.png', false);
        this.leftrock1.position.x = -30;
        this.leftrock1.position.y = 870;
        this.container.addChild(this.leftrock1);
        //bubbles left
        this.bubblesleft = Functions.loadSprite(this.app.loader, 'bubblesleft', '', true);
        this.bubblesleft.animationSpeed = .1;
        this.bubblesleft.position.y = 350;
        this.bubblesleft.position.x = 20;
        this.bubblesleft.play();
        this.myAnimationsSprites.push(this.bubblesleft);
        this.container.addChild(this.bubblesleft);
    }

    private createRightCorals(){
        //stick leaves 2
        this.rightstickleaves2 = Functions.loadSprite(this.app.loader, 'rightstickleaves2', '', true);
        this.rightstickleaves2.animationSpeed = .15;
        this.rightstickleaves2.position.y = 620;
        this.rightstickleaves2.position.x = 1400;
        this.rightstickleaves2.play();
        this.myAnimationsSprites.push(this.rightstickleaves2);
        this.container.addChild(this.rightstickleaves2);
        //right rock1
        this.rightrock1 = Functions.loadSprite(this.app.loader, 'static_rocks', 'right_behind_rock.png', false);
        this.rightrock1.position.y = 700;
        this.rightrock1.position.x = 1400;
        this.container.addChild(this.rightrock1);
        //leaves right
        this.leaves_right = Functions.loadSprite(this.app.loader, 'leaves_right_animated', '', true);
        this.leaves_right.animationSpeed = .15;
        this.leaves_right.position.x = 1450;
        this.leaves_right.position.y = 690;
        this.leaves_right.play();
        this.myAnimationsSprites.push(this.leaves_right);
        this.container.addChild(this.leaves_right);
        //static corals
        this.static_right_corals = Functions.loadSprite(this.app.loader, 'static_corals', 'right_rock_corals.png', false);
        this.static_right_corals.y = 20;
        this.static_right_corals.x = this.app.stage.width - this.static_right_corals.width;
        this.container.addChild(this.static_right_corals);
        //green leave right 1
        this.green_leaves_right1 = Functions.loadSprite(this.app.loader, 'green_leaves_right', '', true);
        this.green_leaves_right1.animationSpeed = .15;
        this.green_leaves_right1.position.y = 770;
        this.green_leaves_right1.position.x = 1550;
        this.green_leaves_right1.play();
        this.myAnimationsSprites.push(this.green_leaves_right1);
        this.container.addChild(this.green_leaves_right1);
        //right rock2
        this.rightrock2 = Functions.loadSprite(this.app.loader, 'static_rocks', 'right_rock_front.png', false);
        this.rightrock2.position.y = 810;
        this.rightrock2.position.x = this.app.stage.width - this.rightrock2.width;
        this.container.addChild(this.rightrock2);
        //stick leaves 1
        this.rightstickleaves1 = Functions.loadSprite(this.app.loader, 'rightstickleaves1', '', true);
        this.rightstickleaves1.animationSpeed = .15;
        this.rightstickleaves1.position.y = 400;
        this.rightstickleaves1.position.x = 1670;
        this.rightstickleaves1.play();
        this.myAnimationsSprites.push(this.rightstickleaves1);
        this.container.addChild(this.rightstickleaves1);
        //right tube1
        this.righttube1 = Functions.loadSprite(this.app.loader, 'static_rocks', 'right_tube.png', false);
        this.righttube1.position.y = 485;
        this.righttube1.position.x = 1670;
        this.container.addChild(this.righttube1);
        //bubbles right
        this.bubblesright = Functions.loadSprite(this.app.loader, 'bubblesleft', '', true);
        this.bubblesright.animationSpeed = .1;
        this.bubblesright.position.y = 100;
        this.bubblesright.position.x = 1700;
        this.bubblesright.play();
        this.myAnimationsSprites.push(this.bubblesright);
        this.container.addChild(this.bubblesright);
        //blue coral
        this.bluecoral = Functions.loadSprite(this.app.loader, 'static_corals', 'right_coral_2.png', false);
        this.bluecoral.position.x = (this.app.screen.width - this.bluecoral.width);
        this.bluecoral.position.y = 610;
        this.container.addChild(this.bluecoral);
    }

    public stopMyanimations(){
        this.myAnimationsGSAP.forEach((element: any) => {
            element.pause();
        });
        this.myAnimationsSprites.forEach((element: any) => {
            element.gotoAndStop(0);
        });
    }

    public startMyanimations(){
        this.myAnimationsGSAP.forEach((element: any) => {
            element.play();
        });
        this.myAnimationsSprites.forEach((element: any) => {
            element.play();
        });
    }

    private changeButton(){
        if(!this.autoplay){
            this.controller.singleplay_button.texture = this.playbtn.texture;
        }
    }

    private setAutoPlay(number: number){
        if(this.controller.bet <= this.controller.balance){
            this.setButtonsBoolean(false);
            this.autoplay = true;
            // this.controller.playtext.style.fill = '#FF0000';
            this.controller.singleplay_button.texture = this.stopbtn.texture;
            this.playcount = number;
        }
    }

    private setAutoSpinText(){
        if(!this.isfreespinslot){
            if(this.autoplay){
                this.updateTopPayline(`AUTO SPIN LEFT ${this.playcount}`);
            }
            else{
                this.updateTopPayline('TAP SPACE TO SKIP ANIMATIONS');
            }
        }
        else{
            this.updateTopPayline(`FREE SPIN LEFT ${this.bonusoffer}`);
        }
    }

    private playSlotAuto(){
        if(this.playcount > 0){
            this.slotgame.reelsAnimation(this.controller.bet, this.controller.modalautoplay.spintype);
        }
        else{
            this.stopAutoPlay();
        }
    }

    private congratsPopup(){
        if(this.bonusoffer == 0){
            this.createCongrats(this.bonustotalwin, this.bonustotalspin);
        }
    }

    private createCongrats(win: number, spin: number){
        if(!this.isfreespinslot){
            this.openmodal = true;
        }
        else{
            this.openmodalfreespin = true;
            
        }
        this.controller.mybuttons.forEach(element => {
            element.interactive = false;
            element.buttonMode = false;
        });
        this.congratspopup = new Congrats(this.app, this.openModalInPopup.bind(this), win, spin, this.soundVolume.bind(this));
        this.container.addChild(this.congratspopup.container);
        this.playSound(20);
        this.soundVolume(25);
        this.congratspopup.overlay.addListener("pointerdown", ()=>{
            this.playSound(9)
            this.congratspopup.finishQuick();
            this.createStarFish();
            this.animateStarFish();
            this.createBubbles();
            this.animateBubbles();
            this.transitionStarfish(false);
            this.soundStop(20);
        })
    }

    private playFreeSlotAuto(){
        if(this.bonusoffer > 0){
            this.slotgame.reelsAnimation(this.controller.bet, this.controller.modalautoplay.spintype);
        }
        else{
            this.isfreespinslot = false;
            this.lastround = true;
        }
    }

    private stopAutoPlay(){
        this.playcount = 0;
        this.autoplay = false;
        this.controller.playtext.style.fill = '#FFFFFF';
        this.controller.singleplay_button.texture = this.playbtn.texture;
        this.setButtonsBoolean(true);
        this.updateTopPayline('TAP SPACE TO SKIP ANIMATIONS');
    }

    private updateBalanceDecrease(){
        if(!this.isfreespinslot){
            let bet = this.controller.bet;
            if(this.isfreespin){
                this.isfreespin = false;
                bet = this.bonusprize;
            }
            let newbal = this.controller.balance - bet;
            this.playcount--;
            this.controller.balance = newbal;
            this.controller.balancevalue.text = Functions.formatNumber(newbal);
            this.controller.balancevalue.position.x =  (this.controller.balance_box.width - this.controller.balancevalue.width) / 2;
            this.controller.balancevalue.position.y = (this.controller.balance_box.height - this.controller.balancevalue.height) / 2;
            if(bet > newbal){
                this.stopAutoPlay();
            }
        }
        else{
           this.bonusoffer--;
        }
    }

    private updateBalanceIncrease(win: number){
        let bet = this.controller.bet;
        let newbal = this.controller.balance + win;
        this.controller.balance = newbal;
        this.controller.balancevalue.text = Functions.formatNumber(newbal);
        this.controller.balancevalue.position.x =  (this.controller.balance_box.width - this.controller.balancevalue.width) / 2;
        this.controller.balancevalue.position.y = (this.controller.balance_box.height - this.controller.balancevalue.height) / 2;
        let popup = this.checkPopUp(win, this.controller.bet);
        if(popup != 0){
            if(this.isfreespinslot){
                if(!this.slotgame.isbonus && this.bonusoffer > 0){
                    if(popup == 1){
                        this.createNiceOne(win);
                    }
                    else if(popup == 2){
                        this.createImpressive(win);
                    }
                    else{
                        this.createExcellent(win);
                    }
                }
            }
            else{
                if(this.lastround){
                    this.bonustotalwin += win;
                    this.lastround = false;
                }
                else{
                    if(!this.slotgame.isbonus){
                        if(popup == 1){
                            this.createNiceOne(win);
                        }
                        else if(popup == 2){
                            this.createImpressive(win);
                        }
                        else{
                            this.createExcellent(win);
                        }
                    }
                }
            }
        }
        if(this.isfreespinslot){
            this.bonustotalwin += win;
        }
    }

    private checkPopUp(win: number, bet: number){
        let ret = 0;
        if((win/bet) >= 5 && (win/bet) <= 10){
            //nice one
            ret = 1;
        }
        else if((win/bet) >= 11 && (win/bet) <= 20){
            //impressive
            ret = 2;
        }
        else if((win/bet) >= 21){
            //excellent win
            ret = 3;
        }
        else{
            ret = 0
        }
        return ret;
    }

    private allAnimations(){
        if(!this.switchtheme){
            //single play auto stop
            if(this.autostop){
                let reel = this.slotgame.spinreel;
                if(reel.length == 5){
                    this.autostop = false;
                    this.startgame = false;
                    this.soundStop(15);
                    if(this.slotgame.isbonus){
                        this.slotgame.reeleffectbgcontainer.forEach((element, index) => {
                            element.visible = false;
                            this.slotgame.bgeffect[index].gotoAndStop(0);
                            this.slotgame.lineeffect[index].gotoAndStop(0);
                        });
                    }
                    reel.forEach((element: any) => {
                        element.duration(.1);
                    });
                }
            }

            if(this.autospin){
                if(this.slotgame.startreel){
                    this.slotgame.reelsAnimation(this.controller.bet, this.controller.modalautoplay.spintype);
                    this.autospin = false;
                    this.autostop = false;
                }
            }

            if(this.autoplay){
                if(!this.openmodal){
                    this.playSlotAuto();
                }
            }

            if(this.isfreespinslot){
                if(!this.openmodalfreespin){
                    console.log(this.bonusoffer)
                    this.playFreeSlotAuto();
                }
            }
        }
    }
}
