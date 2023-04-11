import * as PIXI from 'pixi.js';
import Functions from '../../Functions';
import json from './gamerules.json'
import { Scrollbox } from 'pixi-scrollbox';

export default class ModalInfo {
    public overlay: PIXI.Graphics;
    private app: PIXI.Application;
    public container: PIXI.Container;
    public topcontainer: PIXI.Container;
    public modal_container: PIXI.Sprite;
    public patternSprite: PIXI.Sprite;
    public patternSprite2: PIXI.Sprite;
    private textstyle: PIXI.TextStyle;
    private titlestyle: PIXI.TextStyle;
    private descstyle1: PIXI.TextStyle;
    private descstyle2: PIXI.TextStyle;
    private descstyle3: PIXI.TextStyle;
    private descstyle11: PIXI.TextStyle;
    private descstyle22: PIXI.TextStyle;
    private descstyle33: PIXI.TextStyle;
    public modal_close: PIXI.Sprite;
    public next_btn: PIXI.Sprite;
    public prev_btn: PIXI.Sprite;
    public firstItemContainer: PIXI.Container;
    public firstItemContainer2: PIXI.Container;
    public secondItemContainer: PIXI.Container;
    public secondItemContainer2: PIXI.Container;
    public thirdItemContainer: PIXI.Container;
    public thirdItemContainer2: PIXI.Container;
    public slideBtnsContainer:PIXI.Container
    private page: number = 1;
    private playSound:(index: number) => void;

    constructor(app: PIXI.Application, playSound:(index: number) => void) {
        this.app = app;
        this.container = new PIXI.Container();
        this.firstItemContainer = new PIXI.Container();
        this.firstItemContainer2 = new PIXI.Container();
        this.secondItemContainer = new PIXI.Container();
        this.secondItemContainer2 = new PIXI.Container();
        this.thirdItemContainer = new PIXI.Container();
        this.thirdItemContainer2 = new PIXI.Container();
        this.slideBtnsContainer = new PIXI.Container();
        this.textstyle = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 25,
            fontWeight: 'bold',
            fill: '#FFFFFF'
        });
        this.titlestyle = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 40,
            fontWeight: 'bold',
            fill: '#FEAE4D'
        });
        this.descstyle1 = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 11,
            fill: '#ffffff'
        });
        this.descstyle2 = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 15,
            fontWeight: 'bold',
            fill: '#ffffff'
        });
        this.descstyle3 = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 13,
            fontWeight: 'bold',
            fill: '#ffffff'
        });
        this.descstyle11 = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 23,
            fill: '#ffffff'
        });
        this.descstyle22 = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 26,
            fontWeight: 'bold',
            fill: '#ffffff'
        });
        this.descstyle33 = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 24,
            fontWeight: 'bold',
            fill: '#ffffff'
        });
        this.playSound = playSound;
        this.init();
    }

    private init() {
        this.createOverlay();
        this.createParent();
        this.createNextPrevBtn();
        this.createSlotPaytable();
        this.createSlotPaytable2();
        this.createPattern();
        this.createPattern2();
        this.createHowtoPlay();
        this.createHowtoPlay2();
        this.secondItemContainer.alpha = 0;
        this.secondItemContainer2.alpha = 0;
        this.thirdItemContainer.alpha = 0;
        this.thirdItemContainer2.alpha = 0;
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

    private createNextPrevBtn(){
        const gap = 70;
        this.next_btn = Functions.loadSprite(this.app.loader, 'new_controllers', 'next.png', false);
        this.prev_btn = Functions.loadSprite(this.app.loader, 'new_controllers', 'prev.png', false);
        this.prev_btn.y = (this.modal_container.height - this.prev_btn.height) / 2;
        this.next_btn.y = (this.modal_container.height - this.next_btn.height) / 2;
        this.prev_btn.x = gap;
        this.next_btn.x = (this.modal_container.width - this.next_btn.width) - gap;
        this.prev_btn.alpha = 0;
        this.next_btn.zIndex = 100
        this.prev_btn.zIndex = 100
        this.slideBtnsContainer.addChild(this.next_btn,this.prev_btn)
        this.modal_container.addChild(this.slideBtnsContainer);
        //events
        this.next_btn.interactive = true;
        this.prev_btn.interactive = true;
        this.next_btn.buttonMode = true;
        this.prev_btn.buttonMode = true;
        this.next_btn.addListener("pointerdown", () => {
            this.playSound(9)
            this.page++;
            if(this.page == 2){
                this.prev_btn.interactive = true;
                this.prev_btn.alpha = 1;
                this.firstItemContainer.alpha = 0;
                this.firstItemContainer2.alpha = 0;
                this.secondItemContainer.alpha = 1;
                this.secondItemContainer2.alpha = 1;
            }
            if(this.page == 3){
                this.next_btn.interactive = false;
                this.next_btn.alpha = 0;
                this.secondItemContainer.alpha = 0;
                this.secondItemContainer2.alpha = 0;
                this.thirdItemContainer.alpha = 1;
                this.thirdItemContainer2.alpha = 1;
            }
        });
        this.prev_btn.addListener("pointerdown", () => {
            this.playSound(9)
            this.page--;
            if(this.page == 1){
                this.prev_btn.interactive = true;
                this.prev_btn.alpha = 0;
                this.secondItemContainer.alpha = 0;
                this.secondItemContainer2.alpha = 0;
                this.firstItemContainer.alpha = 1;
                this.firstItemContainer2.alpha = 1;
            }
            if(this.page == 2){
                this.next_btn.interactive = true;
                this.next_btn.alpha = 1;
                this.thirdItemContainer.alpha = 0;
                this.thirdItemContainer2.alpha = 0;
                this.secondItemContainer.alpha = 1;
                this.secondItemContainer2.alpha = 1;
            }
        });
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
    
    private createSlotPaytable(){
        const title = new PIXI.Text("PAYTABLE SLOT", this.titlestyle);
        title.y = title.height / 2;
        title.x = (this.modal_container.width - title.width) / 2;
        this.firstItemContainer.addChild(title);
        let posx = 0;
        let posy = title.y + (title.height / 2);
        const gap = 10;
        //top one
        const topcontainer = new PIXI.Container();
        const topcontens = [
            { img :  'slot_turtle', text:  '0.3' },
            { img :  'slot_sea_horse', text:  '0.5' },
            { img :  'slot_penguin', text:  '0.5' },
            { img :  'slot_walrus', text:  '1' },
            { img :  'slot_octopus', text:  '1' }
        ];
        topcontens.forEach(element => {
            const container = new PIXI.Container();
            //image
            const sprite = Functions.loadSprite(this.app.loader, element.img, '', true);
            const texture = sprite.texture;
            const image = new PIXI.Sprite(texture);
            const h = image.height;
            const w = image.width;
            image.height = 195;
            image.width = (w / h) * 195;
            container.addChild(image);
            container.x = posx;
            posx += (gap + container.width);
            //text
            const text = new PIXI.Text(element.text, this.textstyle);
            text.y = image.height;
            text.x = (image.width - text.width) / 2;
            container.addChild(text);
            topcontainer.addChild(container);
        });
        topcontainer.y = posy;
        topcontainer.x = (this.modal_container.width - topcontainer.width) / 2;
        this.firstItemContainer.addChild(topcontainer);
        this.modal_container.addChild(this.firstItemContainer);
        //middle
        posx = 0;
        const middlecontainer = new PIXI.Container();
        const middlecontents = [
            { img :  'slot_letter_j', text:  '0.1' },
            { img :  'slot_letter_k', text:  '0.15' },
            { img :  'slot_letter_a', text:  '0.2' }
        ];
        middlecontents.forEach(element => {
            const container = new PIXI.Container();
            //image
            const sprite = Functions.loadSprite(this.app.loader, element.img, '', true);
            const texture = sprite.texture;
            const image = new PIXI.Sprite(texture);
            const h = image.height;
            const w = image.width;
            image.height = 195;
            image.width = (w / h) * 195;
            container.addChild(image);
            container.x = posx;
            posx += (gap + container.width);
            //text
            const text = new PIXI.Text(element.text, this.textstyle);
            text.y = image.height;
            text.x = (image.width - text.width) / 2;
            container.addChild(text);
            middlecontainer.addChild(container);
        });
        middlecontainer.y = posy + topcontainer.height;
        middlecontainer.x = (this.modal_container.width - middlecontainer.width) / 2;
        this.firstItemContainer.addChild(middlecontainer);
        this.modal_container.addChild(this.firstItemContainer);
        //bottom
        const style = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 15,
            fontWeight: 'bold',
            fill: '#FFFFFF'
        });
        posx = 0;
        const bottomcontainer = new PIXI.Container();
        const bottomcontents = [
            { img :  'slot_bonus', text:  'This is the bonus symbol. It shows up on all reels. Hit 3 or more BONUS symbols to trigger the BONUS GAME.' },
            { img :  'slot_mega', text:  'This is the JACKPOT symbol. It triggers same as the common symbols but pays higher than usual.' },
            { img :  'slot_wild', text:  'This is the WILD symbol. It substitutes all the symbols excep BONUS. It shows up on all reels.' }
        ];
        bottomcontents.forEach(element => {
            const container = new PIXI.Container();
            //image
            const sprite = Functions.loadSprite(this.app.loader, element.img, '', true);
            const texture = sprite.texture;
            const image = new PIXI.Sprite(texture);
            const h = image.height;
            const w = image.width;
            image.height = 230;
            image.width = (w / h) * 230;
            container.addChild(image);
            //text
            const text = new PIXI.Text(element.text, style);
            text.x = image.width;
            text.y = image.y + 25;
            text.style.wordWrap = true;
            text.style.wordWrapWidth = 160;
            text.style.lineHeight = 25;
            container.addChild(text);
            //position
            container.x = posx;
            posx += (gap + container.width);
            bottomcontainer.addChild(container);
        });
        bottomcontainer.y = posy + topcontainer.height + middlecontainer.height;
        bottomcontainer.x = (this.modal_container.width - bottomcontainer.width) / 2;
        this.firstItemContainer.addChild(bottomcontainer);
        this.modal_container.addChild(this.firstItemContainer);
    }

    private createSlotPaytable2(){
        const title = new PIXI.Text("PAYTABLE SLOT", this.titlestyle);
        title.y = title.height / 2;
        title.x = (this.modal_container.width - title.width) / 2;
        this.firstItemContainer2.addChild(title);
        let posx = 0;
        let posy = title.y + (title.height / 2);
        const gap = 10;
        //top one
        const topcontainer = new PIXI.Container();
        const topcontens = [
            { img :  'slot_turtle', text:  '0.3' },
            { img :  'slot_sea_horse', text:  '0.5' },
            { img :  'slot_penguin', text:  '0.5' },
            { img :  'slot_walrus', text:  '1' },
            { img :  'slot_octopus', text:  '1' }
        ];
        topcontens.forEach((element,index) => {
            const container = new PIXI.Container();
            //image
            const sprite = Functions.loadSprite(this.app.loader, element.img, '', true);
            const texture = sprite.texture;
            const image = new PIXI.Sprite(texture);
            const h = image.height;
            const w = image.width;
            image.height = 195;
            image.width = (w / h) * 195;
            container.addChild(image);
            container.x = posx;
            posx += (gap + container.width);
            //text
            const text = new PIXI.Text(element.text, this.textstyle);
            text.y = image.height;
            text.x = (image.width - text.width) / 2;
            if(index == 3){
                container.y = container.height + (gap*1.1)
                container.x = 120
            }
            if(index == 4){
                container.x = (150*2)
                container.y = container.height + (gap*1.1)
            }
            container.addChild(text);
            topcontainer.addChild(container);
        });
        topcontainer.y = posy*3;
        topcontainer.x = (this.modal_container.width - topcontainer.width) / 2;
        this.firstItemContainer2.addChild(topcontainer);
        this.modal_container.addChild(this.firstItemContainer2);
        //middle
        posx = 0;
        const middlecontainer = new PIXI.Container();
        const middlecontents = [
            { img :  'slot_letter_j', text:  '0.1' },
            { img :  'slot_letter_k', text:  '0.15' },
            { img :  'slot_letter_a', text:  '0.2' }
        ];
        middlecontents.forEach(element => {
            const container = new PIXI.Container();
            //image
            const sprite = Functions.loadSprite(this.app.loader, element.img, '', true);
            const texture = sprite.texture;
            const image = new PIXI.Sprite(texture);
            const h = image.height;
            const w = image.width;
            image.height = 195;
            image.width = (w / h) * 195;
            container.addChild(image);
            container.x = posx;
            posx += (gap + container.width);
            //text
            const text = new PIXI.Text(element.text, this.textstyle);
            text.y = image.height;
            text.x = (image.width - text.width) / 2;
            container.addChild(text);
            middlecontainer.addChild(container);
        });
        middlecontainer.y = (posy + topcontainer.height)*1.2;
        middlecontainer.x = (this.modal_container.width - middlecontainer.width) / 2;
        this.firstItemContainer2.addChild(middlecontainer);
        this.modal_container.addChild(this.firstItemContainer2);
        //bottom
        const style = new PIXI.TextStyle({
            fontFamily: 'Montserrat',
            fontSize: 15,
            fontWeight: 'bold',
            fill: '#FFFFFF'
        });
        posx = 0;
        const bottomcontainer = new PIXI.Container();
        const bottomcontents = [
            { img :  'slot_bonus', text:  'This is the bonus symbol. It shows up on all reels. Hit 3 or more BONUS symbols to trigger the BONUS GAME.' },
            { img :  'slot_mega', text:  'This is the JACKPOT symbol. It triggers same as the common symbols but pays higher than usual.' },
            { img :  'slot_wild', text:  'This is the WILD symbol. It substitutes all the symbols excep BONUS. It shows up on all reels.' }
        ];
        bottomcontents.forEach((element,index) => {
            const container = new PIXI.Container();
            //image
            const sprite = Functions.loadSprite(this.app.loader, element.img, '', true);
            const texture = sprite.texture;
            const image = new PIXI.Sprite(texture);
            const h = image.height;
            const w = image.width;
            image.height = 230;
            image.width = (w / h) * 230;
            container.addChild(image);
            //text
            const text = new PIXI.Text(element.text, style);
            text.x = image.width;
            text.y = image.y + 25;
            text.style.wordWrap = true;
            text.style.wordWrapWidth = 160;
            text.style.lineHeight = 25;
            container.addChild(text);
            //position
            container.x = posx;
            if(index == 2){
                container.y = container.height + 30
                container.x = 170
            }
            posx += (gap + container.width);
            bottomcontainer.addChild(container);
        });
        bottomcontainer.y = (posy + topcontainer.height + middlecontainer.height) * 1.2;
        bottomcontainer.x = (this.modal_container.width - bottomcontainer.width) / 2;
        this.firstItemContainer2.addChild(bottomcontainer);
        this.modal_container.addChild(this.firstItemContainer2);
    }

    private createPattern(){
        const title = new PIXI.Text("SLOT PATTERNS", this.titlestyle);
        title.y = title.height / 2;
        
        this.secondItemContainer.addChild(title);
        this.patternSprite = Functions.loadSprite(this.app.loader, 'new_controllers', 'patterns.png', false);
        this.patternSprite.y  = title.y + title.height;
        this.secondItemContainer.addChild(this.patternSprite);
        title.x = (this.secondItemContainer.width - title.width) / 2;
        this.secondItemContainer.x = (this.modal_container.width - this.secondItemContainer.width) / 2;
        this.secondItemContainer.y = 20
        this.modal_container.addChild(this.secondItemContainer);
    }

    private createPattern2(){
        const title = new PIXI.Text("SLOT PATTERNS", this.titlestyle);
        title.y = title.height / 2;
        
        this.secondItemContainer2.addChild(title);
        this.patternSprite2 = Functions.loadSprite(this.app.loader, 'new_controllers', 'pattern2.png', false);
        this.patternSprite2.y  = (title.y + title.height)*4;
        this.secondItemContainer2.addChild(this.patternSprite2);
        title.x = (this.secondItemContainer2.width - title.width) / 2;
        this.secondItemContainer2.x = (this.modal_container.width - this.secondItemContainer2.width) / 2;
        this.secondItemContainer2.y = 20
        this.modal_container.addChild(this.secondItemContainer2);
    }

    private createHowtoPlay(){
        const title = new PIXI.Text("GAME RULES", this.titlestyle);
        title.y = title.height / 2;
        
        this.modal_container.addChild(this.thirdItemContainer);

        const scrollboxwidth = this.modal_container.width * .8;
        const scrollbox = new Scrollbox({ boxWidth: scrollboxwidth, boxHeight: 650, scrollbarForeground : 0xFEAE4D, scrollbarBackground: 0x3d3e40});
        const mycontainer = new PIXI.Container()
        let description: PIXI.Text;
        let position = 0;
        let spacing = 10;

        json.contents.forEach((content : any) => {
            let spritefolder = "new_controlls";
            if(content.id == 16){
                spritefolder = "my_slot_controllers";
            }
            if(content.withimage){
                let container = new PIXI.Container();
                let imgcontainer = new PIXI.Container();
                let imgposx = 0;
                let imgposy = 0;
                if(content.type == 0){
                    description = new PIXI.Text(content.description, this.descstyle1);
                    container.addChild(description);
                    content.images.forEach((img : any) => {
                        const sprite = Functions.loadSprite(this.app.loader, `${spritefolder}`, `${img}`, false);
                        sprite.position.x = imgposx;
                        imgcontainer.addChild(sprite);
                        imgposx += (sprite.width + 10);
                        imgposy = sprite.height;
                    });
                    description.position.y = imgposy + 5;
                }
                else{
                    let posx = 0;
                    content.images.forEach((img : any) => {
                        const imagecontainer2 = new PIXI.Container();
                        const sprite = new PIXI.Sprite(this.app.loader.resources!.controllers.textures![`${img.img}`]);
                        description = new PIXI.Text(img.text, this.descstyle1);
                        imagecontainer2.addChild(description);
                        imagecontainer2.addChild(sprite);
                        sprite.position.x = (imagecontainer2.width / 2) - (sprite.width / 2);
                        description.position.x = (imagecontainer2.width / 2) - (description.width / 2);
                        description.position.y = sprite.height + 8;
                        imagecontainer2.position.x = posx;
                        imgcontainer.addChild(imagecontainer2);
                        posx += (imagecontainer2.width + 10);
                    });
                }
                container.position.x = (scrollboxwidth / 2) - (container.width / 2);
                container.position.y = position;
                imgcontainer.position.x = (container.width / 2) - (imgcontainer.width / 2);
                container.addChild(imgcontainer);
                mycontainer.addChild(container);
                position += (container.height + spacing) + 8;
            }
            else{
                description = new PIXI.Text(content.description, this.descstyle1);
                if(content.istitle){
                    description = new PIXI.Text(content.description, this.descstyle2);
                    description.position.x = (scrollboxwidth / 2) - (description.width / 2);
                    position += 20;
                    description.position.y = position;
                }
                if(content.issubtitle){
                    description = new PIXI.Text(content.description, this.descstyle3);
                    description.position.x = (scrollboxwidth / 2) - (description.width / 2);
                    position += 10;
                    description.position.y = position;
                }
                description.style.lineHeight = 17;
                description.style.wordWrap = true;
                description.style.wordWrapWidth = scrollboxwidth - 12;
                description.position.y = position;
                if(content.text){
                    position += description.height + spacing;
                }
                else{
                    position += description.height + 3;
                    description.position.x = (scrollboxwidth / 2) - (description.width / 2);
                }
                mycontainer.addChild(description);
            }
        });

        scrollbox.position.y = title.y + title.height;
        scrollbox.content.addChild(mycontainer);
        scrollbox.update();
        this.thirdItemContainer.addChild(scrollbox);
        this.thirdItemContainer.addChild(title);
        title.x = (scrollbox.width - title.width) / 2;
        this.thirdItemContainer.x = (this.modal_container.width - this.thirdItemContainer.width) / 2;
        this.modal_container.addChild(this.thirdItemContainer);
    }
    private createHowtoPlay2(){
        const title = new PIXI.Text("GAME RULES", this.titlestyle);
        title.y = title.height / 2;
        
        this.modal_container.addChild(this.thirdItemContainer2);

        const scrollboxwidth = this.modal_container.width * .6;
        const scrollbox = new Scrollbox({ boxWidth: scrollboxwidth, boxHeight: 1500, scrollbarForeground : 0xFEAE4D, scrollbarBackground: 0x3d3e40});
        const mycontainer = new PIXI.Container()
        let description: PIXI.Text;
        let position = 0;
        let spacing = 10;

        json.contents.forEach((content : any) => {
            if(content.withimage){
                let container = new PIXI.Container();
                let imgcontainer = new PIXI.Container();
                let imgposx = 0;
                let imgposy = 0;
                if(content.type == 0){
                    description = new PIXI.Text(content.description, this.descstyle11);
                    container.addChild(description);
                    content.images.forEach((img : any) => {
                        const sprite = Functions.loadSprite(this.app.loader, 'new_controlls', `${img}`, false);
                        sprite.position.x = imgposx;
                        imgcontainer.addChild(sprite);
                        imgposx += (sprite.width + 10);
                        imgposy = sprite.height;
                    });
                    description.position.y = imgposy + 5;
                }
                else{
                    let posx = 0;
                    content.images.forEach((img : any) => {
                        const imagecontainer2 = new PIXI.Container();
                        const sprite = new PIXI.Sprite(this.app.loader.resources!.controllers.textures![`${img.img}`]);
                        description = new PIXI.Text(img.text, this.descstyle11);
                        imagecontainer2.addChild(description);
                        imagecontainer2.addChild(sprite);
                        sprite.position.x = (imagecontainer2.width / 2) - (sprite.width / 2);
                        description.position.x = (imagecontainer2.width / 2) - (description.width / 2);
                        description.position.y = sprite.height + 8;
                        imagecontainer2.position.x = posx;
                        imgcontainer.addChild(imagecontainer2);
                        posx += (imagecontainer2.width + 10);
                    });
                }
                container.position.x = (scrollboxwidth / 2) - (container.width / 2);
                container.position.y = position;
                imgcontainer.position.x = (container.width / 2) - (imgcontainer.width / 2);
                container.addChild(imgcontainer);
                mycontainer.addChild(container);
                position += (container.height + spacing) + 8;
            }
            else{
                description = new PIXI.Text(content.description, this.descstyle11);
                if(content.istitle){
                    description = new PIXI.Text(content.description, this.descstyle22);
                    description.position.x = (scrollboxwidth / 2) - (description.width / 2);
                    position += 20;
                    description.position.y = position;
                }
                if(content.issubtitle){
                    description = new PIXI.Text(content.description, this.descstyle33);
                    description.position.x = (scrollboxwidth / 2) - (description.width / 2);
                    position += 10;
                    description.position.y = position;
                }
                description.style.lineHeight = 32;
                description.style.wordWrap = true;
                description.style.wordWrapWidth = scrollboxwidth - 12;
                description.position.y = position;
                if(content.text){
                    position += description.height + spacing;
                }
                else{
                    position += description.height + 3;
                    description.position.x = (scrollboxwidth / 2) - (description.width / 2);
                }
                mycontainer.addChild(description);
            }
        });

        scrollbox.position.y = (title.y + title.height)*2.3;
        scrollbox.content.addChild(mycontainer);
        scrollbox.update();
        this.thirdItemContainer2.addChild(scrollbox);
        this.thirdItemContainer2.addChild(title);
        title.x = (scrollbox.width - title.width) / 2;
        this.modal_container.addChild(this.thirdItemContainer2);
    }
}
