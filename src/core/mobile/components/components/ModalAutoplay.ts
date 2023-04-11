import * as PIXI from 'pixi.js';
import Functions from '../../Functions';

export default class ModalAutoplay {
    public overlay: PIXI.Graphics;
    private app: PIXI.Application;
    public container: PIXI.Container;
    public modal_container: PIXI.Sprite;
    public modal_close: PIXI.Sprite;
    public playcount: number = 0;
    private betmodal: PIXI.Sprite;
    private betmodalclicked: PIXI.Sprite;
    private arrBtn: Array<PIXI.Sprite> = [];
    private valuestyle: PIXI.TextStyle;
    private toggleon: PIXI.Sprite;
    private toggleoff: PIXI.Sprite;
    private quicktoggle: PIXI.Sprite;
    private turbotoggle: PIXI.Sprite;
    public spintype: string = "normal";
    private closemodal: () => void;
    private autoplay: (number: number) => void
    private playSound: (index:number) => void
    private screenSettings: any;
    public numberscointainer:PIXI.Container
    public numberscointainer2:PIXI.Container
    public quickspincontainer:PIXI.Container
    public turbospincontainer:PIXI.Container
    public letrollcontainer:PIXI.Container
    
    constructor(app: PIXI.Application, closemodal: () => void, autoplay: (number: number) => void, playSound:(index: number) => void) {
        this.app = app;
        this.betmodal = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'bet_modal.png', false);
        this.betmodalclicked = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'bet_modal_clicked.png', false);
        this.toggleon = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'toggle_on.png', false);
        this.toggleoff = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'toggle_off.png', false);
        this.container = new PIXI.Container();
        this.valuestyle = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 40,
            fontWeight: 'bold',
            fill: '#FFFFFF'
        });
        this.screenSettings = Functions.screenSize();
        this.closemodal = closemodal;
        this.autoplay = autoplay;
        this.playSound = playSound;
        this.init();
    }

    private init() {
        this.createOverlay();
        this.createParent();
        this.createContent();
        //positioning
        //parent modal
        this.modal_container.position.x = (this.container.width - this.modal_container.width) / 2;
        this.modal_container.position.y = 100;
        //modal close
        this.modal_close.position.x = (this.modal_container.width - this.modal_close.width) - 5;
        this.modal_close.position.y = 5;
        //main container
        this.container.position.x = (this.app.screen.width - this.container.width) / 2;
    }

    private createOverlay(){
        this.overlay = new PIXI.Graphics();
        this.overlay.beginFill(0x000000, .7)
                .drawRect(0,0,this.app.screen.width, this.app.screen.height)
                .endFill();
        // this.container.addChild(this.overlay);
    }

    private createParent(){
        this.modal_container = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'modal_container.png', false);
        this.container.addChild(this.modal_container);
        this.modal_close = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'modal_close.png', false);
        this.modal_container.addChild(this.modal_close);
        this.modal_close.interactive = true;
        this.modal_close.buttonMode = true;
    }

    private createBtnsOne(){
        this.numberscointainer = new PIXI.Container();
        const arrCount = [1,5,10,25,50,75,100,250,500,1000];
        let posx = 0;
        let posy = 0;
        let gap = 15;
        arrCount.forEach((element, index) => {
            const btn = new PIXI.Sprite(this.betmodal.texture);
            btn.x = posx;
            btn.y = posy;
            btn.interactive = true;
            btn.buttonMode = true;
            this.arrBtn.push(btn);
            const text = new PIXI.Text(arrCount[index], this.valuestyle);
            btn.addChild(text);
            text.x = (btn.width - text.width) / 2;
            text.y = (btn.height - text.height) / 2;
            this.numberscointainer.addChild(btn);
            posx += (btn.width + gap);
            if(index == 4){
                posx = 0;
                posy = btn.height + gap;
            }
            this.btnClicked(btn, arrCount[index]);
        });
        this.numberscointainer.y = 60;
        this.modal_container.addChild(this.numberscointainer);

        this.numberscointainer2 = new PIXI.Container();
        const arrCount2 = [1,5,10,25,50,75,100,250,500,1000];
        let posx2 = 0;
        let posy2 = 0;
        let gap2 = 15;
        arrCount2.forEach((element, index) => {
            const btn = new PIXI.Sprite(this.betmodal.texture);
            btn.x = posx2;
            btn.y = posy2;
            btn.interactive = true;
            btn.buttonMode = true;
            this.arrBtn.push(btn);
            const text = new PIXI.Text(arrCount[index], this.valuestyle);
            btn.addChild(text);
            text.x = (btn.width - text.width) / 2;
            text.y = (btn.height - text.height) / 2;
            this.numberscointainer2.addChild(btn);
            posx2 += (btn.width + gap2);
            if(index == 1){
                posx2 = 0;
                posy2 = btn.height + gap2;
            }
            if(index == 3){
                posx2 = 0;
                posy2 = (btn.height*2) + (gap2*2);
            }
            if(index == 5){
                posx2 = 0;
                posy2 = (btn.height*3) + (gap2*3);
            }
            if(index == 7){
                posx2 = 0;
                posy2 = (btn.height*4) + (gap2*4);
            }
            this.btnClicked(btn, arrCount[index]);
        });
        this.numberscointainer2.y = 60;
        this.modal_container.addChild(this.numberscointainer2);
    }

    private createContent(){
        this.quickspincontainer = new PIXI.Container();
        this.quicktoggle = new PIXI.Sprite(this.toggleoff.texture);
        this.turbotoggle = new PIXI.Sprite(this.toggleoff.texture);
        this.quicktoggle.interactive = true;
        this.quicktoggle.buttonMode = true;
        this.turbotoggle.interactive = true;
        this.turbotoggle.buttonMode = true;
        this.turbospincontainer = new PIXI.Container();
        //quick spin and turbo spin
        const spinstyle = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 45,
            fontWeight: 'bold',
            fill: '#FFFFFF'
        });
        const spinstyle2 = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 20,
            fontWeight: 'bold',
            fill: '#FFFFFF'
        });
        const quickspintext = new PIXI.Text("QUICK SPIN", spinstyle);
        const turbospintext = new PIXI.Text("TURBO SPIN", spinstyle);
        const quickspintextsub = new PIXI.Text("Reduce the overall spin time to play more quickly", spinstyle2);
        const turbospintextsub = new PIXI.Text("Totally remove overall spin time to play more quickly", spinstyle2);
        this.createBtnsOne()
        this.quickspincontainer.addChild(quickspintext);
        this.quickspincontainer.addChild(quickspintextsub);
        this.quickspincontainer.addChild(this.quicktoggle);
        quickspintextsub.style.wordWrap = true;
        quickspintextsub.style.wordWrapWidth = 400;
        quickspintextsub.style.lineHeight = 30;
        this.quicktoggle.scale.set(.6);
        this.quicktoggle.y = (this.quickspincontainer.height - this.quicktoggle.height) / 2;
        this.quicktoggle.x = (quickspintextsub.x + quickspintextsub.width) + 200;
        quickspintextsub.y = quickspintext.y + quickspintext.height;
        this.quickspincontainer.y = this.numberscointainer.y + this.numberscointainer.height + 60;
        this.modal_container.addChild(this.quickspincontainer);

        this.turbospincontainer.addChild(turbospintext);
        this.turbospincontainer.addChild(turbospintextsub);
        this.turbospincontainer.addChild(this.turbotoggle);
        turbospintextsub.style.wordWrap = true;
        turbospintextsub.style.wordWrapWidth = 400;
        turbospintextsub.style.lineHeight = 30;
        this.turbotoggle.scale.set(.6);
        this.turbotoggle.y = (this.turbospincontainer.height - this.turbotoggle.height) / 2;
        this.turbotoggle.x = (turbospintextsub.x + turbospintextsub.width) + 172;
        turbospintextsub.y = turbospintext.y + turbospintext.height;
        this.turbospincontainer.y = this.quickspincontainer.y + this.turbospincontainer.height + 40;

        //center
        this.numberscointainer.x = (this.modal_container.width - this.numberscointainer.width) / 2;
        this.numberscointainer2.x = (this.modal_container.width - this.numberscointainer2.width) / 2;
        this.quickspincontainer.x = (this.modal_container.width - this.quickspincontainer.width) / 2;
        this.turbospincontainer.x = this.quickspincontainer.x;

        this.modal_container.addChild(this.turbospincontainer);

        //events
        this.quicktoggle.addListener("pointerdown", () => {
            this.playSound(9)
            this.turbotoggle.texture = this.toggleoff.texture;
            if(this.quicktoggle.texture == this.toggleoff.texture){
                this.spintype = "quick";
                this.quicktoggle.texture = this.toggleon.texture;
            }
            else{
                this.spintype = "normal";
                this.quicktoggle.texture = this.toggleoff.texture;
            }
        });
        this.turbotoggle.addListener("pointerdown", () => {
            this.playSound(9)
            this.quicktoggle.texture = this.toggleoff.texture;
            if(this.turbotoggle.texture == this.toggleoff.texture){
                this.spintype = "turbo";
                this.turbotoggle.texture = this.toggleon.texture;
            }
            else{
                this.spintype = "normal";
                this.turbotoggle.texture = this.toggleoff.texture;
            }
        });

        this.letrollcontainer = new PIXI.Container();
        const spinstyle3 = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 65,
            fontWeight: 'bold',
            fill: '#FFFFFF'
        });
        const letsrolltext = new PIXI.Text("Let's Roll!", spinstyle3);
        const letrollbtn = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'lets_roll.png', false);
        const letrollbtn2 = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'lets_roll.png', false);
        const letrollbtnclicked = Functions.loadSprite(this.app.loader, 'my_slot_controllers', 'lets_roll_clicked.png', false);
        letrollbtn.addChild(letsrolltext);
        letsrolltext.x = (letrollbtn.width - letsrolltext.width) / 2;
        letsrolltext.y = (letrollbtn.height - letsrolltext.height) / 2;
        letrollbtn.scale.set(.7);
        this.letrollcontainer.addChild(letrollbtn);
        this.modal_container.addChild(this.letrollcontainer);
        this.letrollcontainer.y = this.turbospincontainer.y + this.turbospincontainer.height + 35;
        this.letrollcontainer.x = (this.modal_container.width - this.letrollcontainer.width) / 2;

        //event
        letrollbtn.interactive = true;
        letrollbtn.buttonMode = true;
        letrollbtn.addListener("pointerdown", () => {
            this.playSound(9)
            if(this.playcount > 0){
                letrollbtn.texture = letrollbtnclicked.texture;
                let timeout = setTimeout(() => {
                    letrollbtn.texture = letrollbtn2.texture;
                    this.closemodal();
                    this.autoplay(this.playcount);
                    clearTimeout(timeout)
                }, 100);
            }
            else{
                alert("Please choose a spin count!");
            }
        });
    }

    private btnClicked(btn: PIXI.Sprite, value: number){
        btn.addListener("pointerdown", () => {
            this.playSound(9)
            this.resetTexture();
            this.playcount = value;
            btn.texture = this.betmodalclicked.texture;
        });
    }

    private resetTexture(){
        this.arrBtn.forEach(element => {
            element.texture = this.betmodal.texture;
        });
    }

}
