/*
Name:           NetID:
Daniel Ipema    06232782
Aditya Sanghi   06358461
Yi Zang         06330961
*/

//----------------------------------------
//            LIBRARIES
//----------------------------------------
#include <Servo.h>

//----------------------------------------
//            CONSTANTS
//----------------------------------------
#define THRESH 400 

//----------------------------------------
//            VARIABLES
//----------------------------------------
//WHEEL VARIABLES

//Pin assignments
int Lspeed = 5; //e2
int Rspeed = 6; //e1
int Ldir = 4; //m2
int Rdir = 7; //m1

//Speeds
int speed1 = 250;
int speed2 = 200;
int speed3 = 90;
int speed4 = 140;
int speed5 = 80;
//----------------------------------------

//LIGHTSENSOR VARIABLES

//Pin assignments
int levelPin0 = 0;
int levelPin1 = 1;
int levelPin2 = 2;

//Readings from sensors
int level0 = 0;
int level1 = 0;
int level2 = 0;
//----------------------------------------

// GRIP VARIABLES

Servo servoTurn, servoTilt, servoJaw; //servo declarations
int tiltPin = 13; // tilt pin
int turnPin = 12; //turn pin
int jawPin = 11; //jaw pin
int resistPin = 3; //pressure sensor pin

boolean switch1 = true; //grip boolean

int pressure; //pressure reading from pressure sensor
int i = 70; //counter
int pos = 0; //jaw position
int temp = 0; //temp jaw position
//----------------------------------------

// BUMP VARIABLES

int bumperPin = 5;    // select the input pin for the bumpers
int bumperVal = 0;  // variable to store the value coming from the bumpers

int bumpPin = 4; //pin
int bump = 0; //reading
int bumpFlag = 0;
//----------------------------------------

// WHEEL ENCODER VARIABLES

int senseL;
int prevSenseL=0;
int senseLpin=2;
int senseLcount=0;

int senseR;
int senseRpin=3;
int prevSenseR=0;
int senseRcount=0;
//---------------------------------------


//=======================================
//                SETUP
//=======================================

void setup() {
  pinMode(Rspeed,OUTPUT);
  pinMode(Lspeed,OUTPUT);
  pinMode(Rdir,OUTPUT);
  pinMode(Ldir,OUTPUT);  
  pinMode(0,INPUT);  
  pinMode(1,INPUT);  
  pinMode(2,INPUT);  
  pinMode(senseLpin, INPUT);
  pinMode(senseRpin, INPUT);
  servoTurn.attach(turnPin);
  servoTilt.attach(tiltPin);
  servoJaw.attach(jawPin);
  servoTurn.write(87);
  servoTilt.write(152);
  servoJaw.write(20);
  Serial.begin(115200);
}//end setup


//========================================
//            FUNCTIONS
//========================================

//----------------------------------------
//            WHEEL FUNCTIONS
//----------------------------------------
//Functions which control wheel motion

void wheels1(){
  analogWrite(Rspeed, speed1);
  analogWrite(Lspeed, speed1);
  digitalWrite(Rdir, HIGH);
  digitalWrite(Ldir,HIGH);   
}//end wheels1

void stop1(){
  analogWrite(Lspeed, 0);
  analogWrite(Rspeed, 0);
}//end stop1

void left(){

  digitalWrite(Rdir,HIGH);
  digitalWrite(Ldir,LOW);
  analogWrite(Rspeed,speed1);
  analogWrite(Lspeed,speed1);
  delay(518);

  digitalWrite(Rdir,LOW);
  digitalWrite(Ldir,HIGH);
  analogWrite(Rspeed,speed1);
  analogWrite(Lspeed,speed1);
  delay(30);

}//end left

void right(){

  digitalWrite(Rdir,LOW);
  digitalWrite(Ldir,HIGH);
  analogWrite(Rspeed,speed1);
  analogWrite(Lspeed,speed1);
  delay(515);

  digitalWrite(Rdir,HIGH);
  digitalWrite(Ldir,LOW);
  analogWrite(Rspeed,speed1);
  analogWrite(Lspeed,speed1);
  delay(30);

}//end right

//Driveleft and driveright are used to "cut corners" on the track as 
//exhibited during robot games. 

void driveleft(){

  int x = 1;

  digitalWrite(Rdir,HIGH);
  digitalWrite(Ldir,LOW);

  while(x == 1){

    analogWrite(Rspeed,speed2);
    analogWrite(Lspeed,speed2);

    if(analogRead(levelPin0)<THRESH){

      digitalWrite(Rdir,LOW);
      digitalWrite(Ldir,HIGH);
      analogWrite(Rspeed,speed1);
      analogWrite(Lspeed,speed1);
      delay(100);
      
      stop1();
      x = 0;
      correct();
    }//end if
  }//end while
}//end driveleft

void driveright(){

  int x = 1;
  
  digitalWrite(Rdir,LOW);
  digitalWrite(Ldir,HIGH);

  while(x == 1){

    analogWrite(Rspeed,speed2);
    analogWrite(Lspeed,speed2);

    if(analogRead(levelPin2)<THRESH){

      digitalWrite(Rdir,HIGH);
      digitalWrite(Ldir,LOW);
      analogWrite(Rspeed,speed1);
      analogWrite(Lspeed,speed1);
      delay(100);
      stop1();
      x = 0;
      correct();
    }//end if
  }//end while
}//end driveright

//Correct function adjusts the robots positon to prevent over rotation after 
//grabbing or throwing a ball.

void correct(){

  lightSense(); 

  if((level0<THRESH && level1>THRESH && level2 > THRESH) || (level0<THRESH && level1<THRESH && level2 > THRESH)){

    boolean x=true;

    while(x){

      analogWrite(Rspeed,speed3);
      analogWrite(Lspeed,speed3);
      digitalWrite(Rdir,HIGH);
      digitalWrite(Ldir,LOW); 

      lightSense();

      if(level0>THRESH && level1<THRESH && level2 > THRESH){
        x=false;
        stop1();
      } //end if
    }//end while
  }//end if
  else if((level0>THRESH && level1>THRESH && level2< THRESH)||(level0>THRESH && level1<THRESH && level2< THRESH)){

    boolean y=true;

    while(y){

      analogWrite(Rspeed,speed3);
      analogWrite(Lspeed,speed3);
      digitalWrite(Rdir,LOW);
      digitalWrite(Ldir,HIGH); 

      lightSense();

      if(level0>THRESH && level1<THRESH && level2 > THRESH){
        y=false;
        stop1();
      }//end if 
    }//end while
  }//end of elseif

  else if(level0>THRESH && level1<THRESH && level2 > THRESH){
    stop1();
  }//end else if
}//end of correct

void backward(){

  digitalWrite(Rdir,LOW);
  digitalWrite(Ldir,LOW);
  analogWrite(Rspeed,speed4);
  analogWrite(Lspeed,speed4); 
  delay(570);

  digitalWrite(Rdir,HIGH);
  digitalWrite(Ldir,HIGH);
  analogWrite(Rspeed,speed1);
  analogWrite(Lspeed,speed1);
  delay(25);

  stop1(); 
  correct();
}//end backward

//NOTE: WHEEL ENCODERS were not used during competition due to lack of reliability. 
//----------------------------------------
//            WHEEL ENCODERS
//----------------------------------------

void wheelEnc (){
  senseL = digitalRead(senseLpin);
  senseR = digitalRead(senseRpin);

  if((!prevSenseL&&senseL)||(prevSenseL&&!senseL)) {
    senseLcount++;
    prevSenseL=senseL;
  }//end if

  if((prevSenseL&&senseL)||(!prevSenseL&&!senseL)) {
    senseL = digitalRead(senseLpin);
    senseR = digitalRead(senseRpin);
  }//end if

  if((!prevSenseR&&senseR)||(prevSenseR&&!senseR)) {
    senseRcount++;  
    prevSenseR=senseR;
  }//end if

  if((prevSenseR&&senseR)||(!prevSenseR&&!senseR)) {
    senseL = digitalRead(senseLpin);
    senseR = digitalRead(senseRpin);
  }//end if
}//end wheelEnc


//----------------------------------------
//            BUMP FUNCTION
//----------------------------------------

void Fbumpers(){
  bumperVal = analogRead(bumperPin);   

  if(bumperVal<240){
    stop1();
    bumpFlag = 1;
  } //end else if
  
  else if(bumperVal<700 && bumperVal>400){
    stop1();
    bumpFlag = 1;
  }//end else if
  
  else if(bumperVal<400 && bumperVal>200){
    stop1();
    bumpFlag = 1;
  }//end if statement
  
}//end Fbumpers

//----------------------------------------
//         GRIP AND TOSS FUNCTIONS
//----------------------------------------

void grip(){

  i=70;

  while(switch1==true && i<150){

    pressure=analogRead(resistPin);

    servoJaw.write(i);

    if(pressure>300){

      temp=i;
      switch1=false;\

    }//end if

    i=i+5;
    delay(100);
  }//;end while

  pos=temp;
  servoJaw.write(pos);
}//end grip

void toss(){
  servoJaw.write(40);
  switch1=true;
  delay(500); 
}//end toss 

//----------------------------------------
//            LIGHTSENSE FUNCTION
//----------------------------------------

void lightSense(){
  level0 = analogRead(levelPin0);
  level1 = analogRead(levelPin1);
  level2 = analogRead(levelPin2);
}//end lightsense

//----------------------------------------
//            FOLLOWER FUNCTIONS
//----------------------------------------

/*The first follower uses bumpers to stop the bot*/
void theFollower(){ 

  int flag = 1;
  while(flag == 1){

    lightSense();

    if(level0>THRESH && level1<THRESH && level2 > THRESH){
      wheels1();
    }//end if

    else if(level0<THRESH && level1>THRESH && level2 > THRESH){

      boolean x=true;
      while(x){

        right();

        lightSense();
        x=true;

        if(level0>THRESH && level1<THRESH && level2 > THRESH){
          x=false;
        } //end if
      }//end while
    }//end else if

    else if(level0>THRESH && level1>THRESH && level2 > THRESH){  
      stop1();    
    } //end else if

    else if(level0>THRESH && level1>THRESH && level2< THRESH){

      boolean y=true;

      while(y){

        left();
        lightSense();
        y=true;

        if(level0>THRESH && level1<THRESH && level2 > THRESH){
          y=false;
        }//end if 
      }//end while
    }//end else
    Fbumpers();
    if(bumpFlag){
      flag=0;
    }//end if
  }//while(flag) 
}// end function

/*The second follower uses black tape to stop the bot aka the light sensors*/
void theFollower2(){

  int flag3 = 1;

  while(flag3 == 1){

    lightSense();

    analogWrite(Rspeed, speed1);
    analogWrite(Lspeed, speed1);
    digitalWrite(Rdir, HIGH);
    digitalWrite(Ldir, HIGH); 

    if(level0<THRESH && level1<THRESH && level2<THRESH){
      flag3= 0;
      delay(130);

      digitalWrite(Rdir,LOW);
      digitalWrite(Ldir,LOW);
      analogWrite(Rspeed,speed1);
      analogWrite(Lspeed,speed1);
      delay(92);

      stop1();
      correct();
    }//end if

    else if(level0<THRESH && level1>THRESH && level2>THRESH){

      boolean x=true;

      while(x){

        analogWrite(Rspeed,speed5);
        analogWrite(Lspeed,speed5);
        digitalWrite(Rdir,HIGH);
        digitalWrite(Ldir,LOW); 

        lightSense();

        if((level0>THRESH && level1<THRESH && level2>THRESH) || (level0<THRESH && level1<THRESH && level2<THRESH)){
          x=false;
        }//end if 

      }//end while
    }//end if

    else if(level0>THRESH && level1>THRESH && level2< THRESH){

      boolean y=true;

      while(y){

        analogWrite(Rspeed,speed5);
        analogWrite(Lspeed,speed5);
        digitalWrite(Rdir,LOW);
        digitalWrite(Ldir,HIGH); 

        lightSense();

        if((level0>THRESH && level1<THRESH && level2 > THRESH) || (level0<THRESH && level1<THRESH && level2<THRESH)){
          y=false;
        }//end if

      }//end while
    }//end of else if
  }//end of while(flag)
}//end follower2

//========================================
//            MAIN LOOP
//========================================
//Bluetooth is used to inform the robot where the ball is next.
//A swtich loop is used for each character sent by the host computer. 
//Each character corresponds to a direction (left, right or center)

void loop(){
  
  int key;

  while(Serial.available()) {
    key = Serial.read();
  }//end while
  
  switch (key) {

  case 65:
    driveleft();
    theFollower();
    Serial.println("forward1");

    grip();
    Serial.println("grip");

    backward();
    correct();
    delay(50);
    left();

    theFollower2();
    Serial.println("forward2");
  break;

  case 87:
    theFollower();
    Serial.println("forward1");

    grip();
    Serial.println("grip");

    backward();
    correct();
    delay(50);
    driveleft();

    theFollower2();
    Serial.println("forward2");
    delay(50);
    theFollower2();

    toss();
    backward();
    correct();
    delay(50);
    driveleft();

    theFollower2();
    Serial.println("forward2");
    break;

  case 68:
    driveright();
    theFollower();
    Serial.println("forward");

    grip();
    Serial.println("grip");

    backward();
    correct();
    delay(50);
    right();

    theFollower2();
    Serial.println("forward2");

    toss();
    backward();
    correct();
    delay(50);
    driveright();

    theFollower2();
    Serial.println("forward2");
   break;

  }//end case
}//end loop

//========================================
//            THE END
//========================================

