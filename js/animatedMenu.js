/**
 * Created by Nur-E-Elahi Shonchoy on 2016-11-26.
 */

console.log("Load animatedMenu script");

document.body.addEventListener('keydown',this.check,false);
var menuScreenLoaded = false;
var cursorPosition = 3;
var cursorPositionY = 0;

function check(e) {
    if (e.keyCode == 77){
        console.log("M is pressed");
        if (menuScreenLoaded){
            unloadMenuScreen();
        }
        else{
            loadMenuScreen();
        }
    }
    if (menuScreenLoaded) {
        switch (e.keyCode) {
            case 37:
                moveCursorLeft();
                break; //Left key
            case 38:
                moveCursorUp();
                break; //Up key
            case 39:
                moveCursorRight();
                break; //Right key
            case 40:
                moveCursorDown();
                break; //Down key
        }
    }
}


function loadMenuScreen(){
    console.log("Menu Screen Loaded");
    menuScreenLoaded = true;
    render();
//    animateOnLoad();
    loadMenuAnimation();
    loadCursor();
    //Push Up Current Sub Menu in current cursor position
    pushSubMenuUp();

}


function unloadMenuScreen(){
    console.log("Menu Screen Unloaded");
    menuScreenLoaded = false;
    unloadMenuAnimation();
}



function moveCursorLeft() {
    if (cursorPosition>0){

        cursorPositionY=0;
        menuItem_cursor.cursorColor = 'rgba(34, 210, 118, 0.45)';

        menuItem_cursor.x = mainMenuObjects[cursorPosition-1].x_final;
        cursorPosition--;
        pushSubMenuUp();
        pullSubMenuDownRight();
        if (cursorPosition>0){
            pushLeftAnimation();
        }

        if (cursorPosition!=1){
            pullSubMenuDownLeft();
        }
    }
}

function moveCursorRight() {
    if (cursorPosition<7){
        cursorPositionY=0;
        menuItem_cursor.cursorColor = 'rgba(34, 210, 118, 0.45)';
        menuItem_cursor.x = mainMenuObjects[cursorPosition+1].x_final;
        cursorPosition++;
        pushSubMenuUp();
        pullSubMenuDownLeft();
        if (cursorPosition<7){
            pushRightAnimation();
        }
        if (cursorPosition!=7){
            pullSubMenuDownRight();
        }
    }
}

function moveCursorUp() {
    if (SubMenuObjects[cursorPosition].length>0 ){
        //Sub Menu Available
        menuItem_cursor.cursorColor = 'rgba(0, 0, 0, 0)';
        if (cursorPositionY < SubMenuObjects[cursorPosition].length) {
            SubMenuObjects[cursorPosition][cursorPositionY].bgcolor = 'rgba(34, 210, 118, 0.75)';
            if (cursorPositionY > 0) {
                SubMenuObjects[cursorPosition][cursorPositionY - 1].bgcolor = SubMenuObjects[cursorPosition][cursorPositionY - 1].bgcolorVisible;
            }
            cursorPositionY++;
            //console.log(cursorPositionY);
        }
    }
}

function moveCursorDown() {
    if (SubMenuObjects[cursorPosition].length>0 ){
        //Sub Menu Available
        menuItem_cursor.cursorColor = 'rgba(0, 0, 0, 0)';
        if (cursorPositionY >0) {
            //console.log(cursorPositionY);
            cursorPositionY--;
            SubMenuObjects[cursorPosition][cursorPositionY].bgcolor = SubMenuObjects[cursorPosition][cursorPositionY].bgcolorVisible;

            if (cursorPositionY>0){
                SubMenuObjects[cursorPosition][cursorPositionY-1].bgcolor = 'rgba(34, 210, 118, 0.75)';
            }
            else{
                menuItem_cursor.cursorColor = 'rgba(34, 210, 118, 0.45)';
            }
        }
    }
}




function menuItems (menuText,x_inital, y_inital, x_final,y_final, menuIcon){
    this.x = x_inital;  // Current X co-ordinate of the item
    this.y = y_inital;  // Current Y co-ordinate of the item
    this.x_inital = x_inital;   // Initial X co-ordinate of the item
    this.y_initial = y_inital;  // Initial Y co-ordinate of the item
    this.x_final = x_final;     // Final X co-ordinate of the item
    this.y_final = y_final;     // Final Y co-ordinate of the item
    this.width = 140;           //Width of the Item
    this.height = 90;           //Height of the Item
    this.bgcolor = '#4F4F4F';   //Primary background color
    this.menuIcon = menuIcon;   ///Menu Icon for the menu
    this.menuText = menuText;   //Title for the menu
    this.cursorColor='rgba(34, 210, 118, 0.45)';    //Highlight Color
}

var menuItem_Settings = new menuItems ('SETTINGS', -140, 560, 70, 560, 'icons/settings.png');
var menuItem_Apps = new menuItems ('APPS', 215, 800, 215, 560, 'icons/apps.png');
var menuItem_Home = new menuItems ('HOME', 360, 800, 360, 560, 'icons/Home.png');
var menuItem_LiveTv = new menuItems ('LIVE TV', 505, 800, 505, 560, 'icons/Live_TV.png');
var menuItem_Recordings = new menuItems ('RECORDINGS', 650, 800, 650, 560, 'icons/recorded.png');
var menuItem_Movies = new menuItems ('MOVIES', 795, 800, 795, 560, 'icons/Live_TV.png');
var menuItem_TvShows = new menuItems ('TV SHOWS', 940, 800, 940, 560, 'icons/on_demand.png');
var menuItem_Search = new menuItems ('SEARCH', 1420, 560, 1085, 560, 'icons/search.png');
var menuItem_cursor = new menuItems ('', 505, 800, 505, 560, '','');

var mainMenuObjects = [menuItem_Settings, menuItem_Apps, menuItem_Home, menuItem_LiveTv, menuItem_Recordings, menuItem_Movies, menuItem_TvShows, menuItem_Search];



function subMenuItems (subMenuTitle, x_inital, y_initial, y_final){
    this.x = x_inital;   // Current X co-ordinate of the item
    this.y = 560;       // Current Y co-ordinate of the item
    this.x_inital = x_inital;    // Initial X co-ordinate of the item
    this.y_initial = y_initial; // Initial Y co-ordinate of the item
    this.x_final = x_inital;    // Final X co-ordinate of the item
    this.y_final = y_final;     // Final Y co-ordinate of the item
    this.subMenuTitle = subMenuTitle;      //Title of the SubMenu
    this.width=140;             //Width of the Item
    this.height=40;             //Height of the Item
    this.bgcolor='rgba(0, 0, 0, 0)'; //Current Color
    this.bgcolorVisible='#4F4F4F'; //Opaque
    this.bgcolorHide='rgba(0, 0, 0, 0)'; //Transparent
    this.textColor='rgba(0, 0, 0, 0)'; //Current Color
    this.textColorVisible='#FFF'; //Opaque
    this.textColorrHide='rgba(0, 0, 0, 0)'; //Transparent
}

var subMenuItem_Settings = [];
var subMenuItem_netflixMedia = new subMenuItems ('NETFLIX',215, 560, 515);
var subMenuItem_youtubeMedia = new subMenuItems ('YOUTUBE', 215, 560, 470);
var subMenuItem_vimeoMedia = new subMenuItems ('VIMEO', 215, 560, 425);
var subMenuItem_vine = new subMenuItems ('VINE',215, 560, 380);
var subMenuItem_Apps = [subMenuItem_netflixMedia, subMenuItem_youtubeMedia, subMenuItem_vimeoMedia, subMenuItem_vine];

var subMenuItem_options = new subMenuItems ('OPTIONS', 360, 560, 515);
var subMenuItem_guest = new subMenuItems ('GUEST', 360, 560, 470);
var subMenuItem_family = new subMenuItems ('FAMILY', 360, 560, 425);
var subMenuItem_Home = [subMenuItem_options, subMenuItem_guest, subMenuItem_family];

var subMenuItem_what = new subMenuItems ('WHATS ON', 505, 560, 515);
var subMenuItem_guide = new subMenuItems ('GUIDE', 505, 560, 470);
var subMenuItem_LiveTv = [subMenuItem_what, subMenuItem_guide];

var subMenuItem_setup = new subMenuItems ('SETUP',650, 560, 515);
var subMenuItem_recent = new subMenuItems ('RECENT',650, 560, 470);
var subMenuItem_Recordings = [subMenuItem_setup, subMenuItem_recent];

var subMenuItem_resume = new subMenuItems ('RESUME',795, 560, 515);
var subMenuItem_favorites = new subMenuItems ('FAVORITES',795, 560, 470);
var subMenuItem_popular = new subMenuItems ('POPULAR',795, 560, 425);
var subMenuItem_Movies = [subMenuItem_resume, subMenuItem_favorites, subMenuItem_popular];

var subMenuItem_favTV = new subMenuItems ('FAVORITES',940, 560, 515);
var subMenuItem_popularTV = new subMenuItems ('POPULAR',940, 560, 470);
var subMenuItem_TvShows = [subMenuItem_favTV, subMenuItem_popularTV];

var subMenuItem_clear = new subMenuItems ('CLEAR RECENT',1085, 560, 515);
var subMenuItem_netflix = new subMenuItems ('NETFLIX',1085, 560, 470);
var subMenuItem_suits = new subMenuItems ('SUITS',1085, 560, 425);
var subMenuItem_ironMan = new subMenuItems ('IRONMAN',1085, 560, 380);
var subMenuItem_Search = [subMenuItem_clear, subMenuItem_netflix, subMenuItem_suits, subMenuItem_ironMan];
var SubMenuObjects = [subMenuItem_Settings, subMenuItem_Apps, subMenuItem_Home, subMenuItem_LiveTv, subMenuItem_Recordings, subMenuItem_Movies, subMenuItem_TvShows, subMenuItem_Search];

var backDrop = {bgcolor:'rbga(0,0,0,0'};

//This function dynamically renders the current status of the elements in the canvas, it is called when the menu is loaded
function render(){
//    console.log("render() called");
    var icon_width = 44;    //Width of each icons in px
    var icon_height = 32;   //Height of each icons in px
    var canvas = document.getElementById("menu");
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        //Draw BackDrop
        context.beginPath();
        context.fillStyle = backDrop.bgcolor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        //Draw MainMenu Objects
        for (var i=0; i<mainMenuObjects.length; i++){
            context.beginPath();
            context.fillStyle = '#4F4F4F';
            context.fillRect(mainMenuObjects[i].x, mainMenuObjects[i].y, mainMenuObjects[i].width, mainMenuObjects[i].height);
            var img = new Image();
            img.src = mainMenuObjects[i].menuIcon;
            context.drawImage(img, mainMenuObjects[i].x + ((mainMenuObjects[i].width)/2)-(icon_width/2), mainMenuObjects[i].y + (mainMenuObjects[i].height-icon_height)/4);
            context.font = "12px sans-serif";
            context.fillStyle = "#fff";
            context.textAlign = "center";
            context.fillText(mainMenuObjects[i].menuText, (mainMenuObjects[i].x+mainMenuObjects[i].width/2), mainMenuObjects[i].y+(mainMenuObjects[i].height)*3/4, mainMenuObjects[i].width);
        }

        //Draw Cursor Object
        context.beginPath();
        context.fillStyle = menuItem_cursor.cursorColor;
        context.fillRect(menuItem_cursor.x, menuItem_cursor.y, menuItem_cursor.width, menuItem_cursor.height);

        //Draw Submenu Objects
        var heightSubMenu = 40;
        var paddingSubMenu = 5;
        for (var i=1; i<SubMenuObjects.length; i++){
            for (var j=0; j<SubMenuObjects[i].length; j++){
                context.beginPath();
                context.fillStyle = SubMenuObjects[i][j].bgcolor;
                context.fillRect(SubMenuObjects[i][j].x, SubMenuObjects[i][j].y, SubMenuObjects[i][j].width, SubMenuObjects[i][j].height);
                context.font = "12px sans-serif";
                context.fillStyle = SubMenuObjects[i][j].textColor;
                context.textAlign = "center";
                context.fillText(SubMenuObjects[i][j].subMenuTitle, (SubMenuObjects[i][j].x + SubMenuObjects[i][j].width/2), (SubMenuObjects[i][j].y+(heightSubMenu/1.6)), SubMenuObjects[i][j].width);
            }
        }
        renderRequest = requestAnimationFrame(render);
    }
}

//Animation: This function pushes the Sub Menu when hovered
function pushSubMenuUp(){
    for (var k=0; k<SubMenuObjects[cursorPosition].length; k++) {
        var steps = 40;
        var subMenuIndex = k;
        //Color Sub Menu and push it up
        SubMenuObjects[cursorPosition][subMenuIndex].bgcolor=SubMenuObjects[cursorPosition][subMenuIndex].bgcolorVisible;
        //Color Text and push it up
        SubMenuObjects[cursorPosition][subMenuIndex].textColor=SubMenuObjects[cursorPosition][subMenuIndex].textColorVisible;
        var stepLength = ((SubMenuObjects[cursorPosition][subMenuIndex].y_initial) - (SubMenuObjects[cursorPosition][subMenuIndex].y_final)) / steps;
        if (SubMenuObjects[cursorPosition][subMenuIndex].y > SubMenuObjects[cursorPosition][subMenuIndex].y_final) {
            SubMenuObjects[cursorPosition][subMenuIndex].y -= stepLength;
            if (SubMenuObjects[cursorPosition][subMenuIndex].y < SubMenuObjects[cursorPosition][subMenuIndex].y_final) {
                SubMenuObjects[cursorPosition][subMenuIndex].y = SubMenuObjects[cursorPosition][subMenuIndex].y_final;
            }
        }
        if (SubMenuObjects[cursorPosition][subMenuIndex].y != SubMenuObjects[cursorPosition][subMenuIndex].y_final) {
            console.log("push SubMenu repeating");
            requestAnimationFrame(pushSubMenuUp);
        }
    }
}

//Animation: This function pulls the left side Sub Menu down when hovered
function pullSubMenuDownLeft(){
    if (cursorPosition>0) {     //Fixed a Bug -> If cursor position is at 0 no need to push down left side menu
        for (var k = 0; k < SubMenuObjects[cursorPosition - 1].length; k++) {
            var steps = 40;
            var subMenuIndex = k;
            var stepLength = ((SubMenuObjects[cursorPosition - 1][subMenuIndex].y_initial) - (SubMenuObjects[cursorPosition - 1][subMenuIndex].y_final)) / steps;
//        console.log(stepLength);
            if (SubMenuObjects[cursorPosition - 1][subMenuIndex].y < SubMenuObjects[cursorPosition - 1][subMenuIndex].y_initial) {
                SubMenuObjects[cursorPosition - 1][subMenuIndex].y += stepLength;
                if (SubMenuObjects[cursorPosition - 1][subMenuIndex].y > SubMenuObjects[cursorPosition - 1][subMenuIndex].y_initial) {
                    SubMenuObjects[cursorPosition - 1][subMenuIndex].y = SubMenuObjects[cursorPosition - 1][subMenuIndex].y_initial;
                }
            }
            if (SubMenuObjects[cursorPosition - 1][subMenuIndex].y != SubMenuObjects[cursorPosition - 1][subMenuIndex].y_initial) {
                //Animation finished Hide the SubMenu
                SubMenuObjects[cursorPosition - 1][subMenuIndex].bgcolor = SubMenuObjects[cursorPosition - 1][subMenuIndex].bgcolorHide;
                SubMenuObjects[cursorPosition - 1][subMenuIndex].textColor = SubMenuObjects[cursorPosition - 1][subMenuIndex].textColorrHide;
                requestAnimationFrame(pullSubMenuDownLeft);
            }
        }
    }
}

//Animation: This function pulls the right side Sub Menu down when hovered
function pullSubMenuDownRight(){
    console.log("pullSubMenuDownLeft() called");
    if (cursorPosition<7) {     //Fixed a Bug -> If cursor position is at 7 no need to push down right side menu
        for (var k = 0; k < SubMenuObjects[cursorPosition + 1].length; k++) {
            var steps = 40;
            var subMenuIndex = k;
            var stepLength = ((SubMenuObjects[cursorPosition + 1][subMenuIndex].y_initial) - (SubMenuObjects[cursorPosition + 1][subMenuIndex].y_final)) / steps;
//        console.log(stepLength);
            if (SubMenuObjects[cursorPosition + 1][subMenuIndex].y < SubMenuObjects[cursorPosition + 1][subMenuIndex].y_initial) {
                SubMenuObjects[cursorPosition + 1][subMenuIndex].y += stepLength;
                if (SubMenuObjects[cursorPosition + 1][subMenuIndex].y > SubMenuObjects[cursorPosition + 1][subMenuIndex].y_initial) {
                    SubMenuObjects[cursorPosition + 1][subMenuIndex].y = SubMenuObjects[cursorPosition + 1][subMenuIndex].y_initial;
                }
            }
            if (SubMenuObjects[cursorPosition + 1][subMenuIndex].y != SubMenuObjects[cursorPosition + 1][subMenuIndex].y_initial) {
                //Animation finished Hide the SubMenu
                SubMenuObjects[cursorPosition + 1][subMenuIndex].bgcolor = SubMenuObjects[cursorPosition + 1][subMenuIndex].bgcolorHide;
                SubMenuObjects[cursorPosition + 1][subMenuIndex].textColor = SubMenuObjects[cursorPosition + 1][subMenuIndex].textColorrHide;
                requestAnimationFrame(pullSubMenuDownRight);
            }
        }
    }
}

//Animation: This function pulls the current Sub Menu down
function pullSubMenuDownCurrentSubmenu(){
    //console.log("pullSubMenuDownCurrentSubmenu() called");
    for (var k=0; k<SubMenuObjects[cursorPosition].length; k++) {
        var steps = 40;
        var subMenuIndex = k;
        var stepLength = ((SubMenuObjects[cursorPosition][subMenuIndex].y_initial) - (SubMenuObjects[cursorPosition][subMenuIndex].y_final)) / steps;
//        console.log(stepLength);
        if (SubMenuObjects[cursorPosition][subMenuIndex].y < SubMenuObjects[cursorPosition][subMenuIndex].y_initial) {
            SubMenuObjects[cursorPosition][subMenuIndex].y += stepLength;
            if (SubMenuObjects[cursorPosition][subMenuIndex].y > SubMenuObjects[cursorPosition][subMenuIndex].y_initial) {
                SubMenuObjects[cursorPosition][subMenuIndex].y = SubMenuObjects[cursorPosition][subMenuIndex].y_initial;
            }
        }
        if (SubMenuObjects[cursorPosition][subMenuIndex].y != SubMenuObjects[cursorPosition][subMenuIndex].y_initial) {
            //Animation finished Hide the SubMenu
            SubMenuObjects[cursorPosition][subMenuIndex].bgcolor=SubMenuObjects[cursorPosition][subMenuIndex].bgcolorHide;
            SubMenuObjects[cursorPosition][subMenuIndex].textColor=SubMenuObjects[cursorPosition][subMenuIndex].textColorrHide;
            requestAnimationFrame(pullSubMenuDownRight);
        }
    }
}

//Handle when Left Key is Pressed
function pushLeftAnimation() {
    for (var i=cursorPosition-1; i>=0; i--){
        mainMenuObjects[i].x -= 50;
    }
    pushLeftAnimationEnd();

}

//Animation: Push Animation when Left Key is Pressed
function pushLeftAnimationEnd() {
    //console.log("pushLeftAnimationEnd() method");
    for (var i=0; i<cursorPosition; i++){
        if (mainMenuObjects[i].x < mainMenuObjects[i].x_final){
            mainMenuObjects[i].x += 5;
            if (mainMenuObjects[i].x > mainMenuObjects[i].x_final){
                mainMenuObjects[i].x = mainMenuObjects[i].x_final;
            }
        }

    }
    if (mainMenuObjects[cursorPosition-1].x != mainMenuObjects[cursorPosition-1].x_final){
        requestAnimationFrame(pushLeftAnimationEnd);
    }

}

//Handle when Right Key is Pressed
function pushRightAnimation() {
    for (var i=cursorPosition+1; i<mainMenuObjects.length; i++){
        mainMenuObjects[i].x += 50;
    }
    pushRightAnimationEnd();
}

//Animation: Push Animation when Right Key is Pressed
function pushRightAnimationEnd() {
    console.log("pushRightAnimationEnd() method");
    for (var i=cursorPosition+1; i<mainMenuObjects.length; i++){
        if (mainMenuObjects[i].x > mainMenuObjects[i].x_final){
            mainMenuObjects[i].x -= 5;
            if (mainMenuObjects[i].x < mainMenuObjects[i].x_final){
                mainMenuObjects[i].x = mainMenuObjects[i].x_final;
            }
        }

    }
    if (mainMenuObjects[7].x != mainMenuObjects[7].x_final){
        requestAnimationFrame(pushRightAnimationEnd);
    }

}
function loadMenuAnimation(){
    //Load BackDrop
    backDrop.bgcolor='rgba(20, 20, 20, 0.7)'
    // Vertical Movement
    for (var i=1; i<mainMenuObjects.length-1; i++){
        var steps = 15; //Stepsize can be fixed here, lower the value greater the length and hence speed of transition
        if (i==1 || i==6){
            steps = 12;
        }
        if (i==2 || i==5){
            steps = 6;
        }
        if (i==3 || i==4){
            steps = 3;
        }
        var stepLengthY = (mainMenuObjects[1].y_initial-mainMenuObjects[1].y_final)/steps;
        if (mainMenuObjects[i].y > mainMenuObjects[i].y_final){
            mainMenuObjects[i].y -= stepLengthY;
            if (mainMenuObjects[i].y < mainMenuObjects[i].y_final){
                mainMenuObjects[i].y = mainMenuObjects[i].y_final;
            }
        }
    }
    // Horizontal Movement (Settings Menu)
    var stepLengthSettingsMenu = ((mainMenuObjects[0].x_final)-(mainMenuObjects[0].x_inital))/steps;
    if (mainMenuObjects[0].x < mainMenuObjects[0].x_final){
        mainMenuObjects[0].x += stepLengthSettingsMenu;
        if (mainMenuObjects[0].x > mainMenuObjects[0].x_final){
            mainMenuObjects[0].x = mainMenuObjects[0].x_final;
        }
    }

    // Horizontal Movement (Search Menu)
    var stepLengthSearchMenu = ((mainMenuObjects[7].x_inital)-(mainMenuObjects[7].x_final))/steps;
    //console.log(stepLengthSearchMenu);
    if (mainMenuObjects[7].x > mainMenuObjects[7].x_final){
        mainMenuObjects[7].x -= stepLengthSearchMenu;
        if (mainMenuObjects[7].x < mainMenuObjects[7].x_final){
            mainMenuObjects[7].x = mainMenuObjects[7].x_final;
        }
    }
    if (mainMenuObjects[7].x != mainMenuObjects[7].x_final){
        requestAnimationFrame(loadMenuAnimation);
    }
    console.log("loadAnimation() called");

}

function loadCursor(){
    var stepsCursor = 20; //Stepsize can be fixed here, lower the value greater the length and hence speed of transition

    // Vertical Movement
    var stepLengthCursor = (menuItem_cursor.y_initial-menuItem_cursor.y_final)/stepsCursor;
    if (menuItem_cursor.y > menuItem_cursor.y_final){
        menuItem_cursor.y -= stepLengthCursor;
        if (menuItem_cursor.y < menuItem_cursor.y_final){
            menuItem_cursor.y = menuItem_cursor.y_final;
        }
    }
    if (menuItem_cursor.y != menuItem_cursor.y_final){
        requestAnimationFrame(loadCursor);
    }
}


function unloadMenuAnimation(){
    //Unload BackDrop
    backDrop.bgcolor='rgba(0, 0, 0, 0)'
    var steps = 10; //Stepsize can be fixed here, lower the value greater the length and hence speed of transition
    // Vertical Movement
    var stepLengthY = (mainMenuObjects[1].y_initial-mainMenuObjects[1].y_final)/steps;
    for (var i=1; i<mainMenuObjects.length-1; i++){
        if (mainMenuObjects[i].y < mainMenuObjects[i].y_initial){
            mainMenuObjects[i].y += stepLengthY;
            if (mainMenuObjects[i].y > mainMenuObjects[i].y_initial){
                mainMenuObjects[i].y = mainMenuObjects[i].y_initial;
            }
        }
    }
    // Horizontal Movement (Settings Menu)
    var stepLengthSettingsMenu = ((mainMenuObjects[0].x_final)-(mainMenuObjects[0].x_inital))/steps;
    if (mainMenuObjects[0].x > mainMenuObjects[0].x_inital){
        mainMenuObjects[0].x -= stepLengthSettingsMenu;
          if (mainMenuObjects[0].x < mainMenuObjects[0].x_inital){
            mainMenuObjects[0].x = mainMenuObjects[0].x_inital;
        }
    }

    // Horizontal Movement (Search Menu)
    var stepLengthSearchMenu = ((mainMenuObjects[7].x_inital)-(mainMenuObjects[7].x_final))/steps;
    //console.log(stepLengthSearchMenu);
    if (mainMenuObjects[7].x < mainMenuObjects[7].x_inital){
        mainMenuObjects[7].x += stepLengthSearchMenu;
        if (mainMenuObjects[7].x > mainMenuObjects[7].x_inital){
            mainMenuObjects[7].x = mainMenuObjects[7].x_inital;
        }
    }

    //UnLoad Cursor
    var stepLengthCursor = (menuItem_cursor.y_initial-menuItem_cursor.y_final)/steps;
    if (menuItem_cursor.y < menuItem_cursor.y_initial){
        menuItem_cursor.y += stepLengthCursor;
        if (menuItem_cursor.y > menuItem_cursor.y_initial){
            menuItem_cursor.y = menuItem_cursor.y_initial;
        }
    }

    if (mainMenuObjects[0].x != mainMenuObjects[0].x_inital){
        requestAnimationFrame(unloadMenuAnimation);
    }

    if (mainMenuObjects[0].x <= mainMenuObjects[0].x_inital){
        //Stop Rendering when mainMenuObjects are back in its inital positon
        var delay=200;  //Render the last unload frames
        setTimeout(function() {
            cancelAnimationFrame(renderRequest);
        }, delay);

    }
    //Unload Sub Menu as well
    pullSubMenuDownCurrentSubmenu();
}
