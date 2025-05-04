import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as THREE from 'three';
import { TweenLite, Power1 } from 'gsap';
import '../../components/games/StackGame.css';

const StackGame: React.FC = () => {
  useEffect(() => {
    // --- Stack Game Logic Start ---
    // (The following is a direct adaptation of the provided JS logic)
    // Helper interfaces
    interface BlockReturn {
      placed?: any;
      chopped?: any;
      plane: 'x' | 'y' | 'z';
      direction: number;
      bonus?: boolean;
    }

    class Stage {
      container: HTMLElement;
      camera: any;
      scene: any;
      renderer: any;
      light: any;
      softLight: any;
      group: any;
      constructor() {
        this.container = document.getElementById('game')!;
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor('#D0CBC7', 1);
        this.container.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        let aspect = window.innerWidth / window.innerHeight;
        let d = 20;
        this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, -100, 1000);
        this.camera.position.x = 2;
        this.camera.position.y = 2;
        this.camera.position.z = 2;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        this.light = new THREE.DirectionalLight(0xffffff, 0.5);
        this.light.position.set(0, 499, 0);
        this.scene.add(this.light);
        this.softLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(this.softLight);
        window.addEventListener('resize', this.onResize);
        this.onResize();
      }
      setCamera(y: number, speed: number = 0.3) {
        TweenLite.to(this.camera.position, speed, { y: y + 4, ease: Power1.easeInOut });
        TweenLite.to(this.camera.lookAt, speed, { y: y, ease: Power1.easeInOut });
      }
      onResize = () => {
        let viewSize = 30;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.left = window.innerWidth / -viewSize;
        this.camera.right = window.innerWidth / viewSize;
        this.camera.top = window.innerHeight / viewSize;
        this.camera.bottom = window.innerHeight / -viewSize;
        this.camera.updateProjectionMatrix();
      };
      render = () => {
        this.renderer.render(this.scene, this.camera);
      };
      add = (elem: any) => {
        this.scene.add(elem);
      };
      remove = (elem: any) => {
        this.scene.remove(elem);
      };
      dispose = () => {
        this.renderer.dispose();
        window.removeEventListener('resize', this.onResize);
      };
    }

    class Block {
      STATES = { ACTIVE: 'active', STOPPED: 'stopped', MISSED: 'missed' };
      MOVE_AMOUNT = 12;
      dimension: { [key: string]: number; width: number; height: number; depth: number } = { width: 0, height: 0, depth: 0 };
      position: { [key: string]: number; x: number; y: number; z: number } = { x: 0, y: 0, z: 0 };
      mesh: any;
      state: string;
      index: number;
      speed: number;
      direction: number;
      colorOffset: number;
      color: any;
      material: any;
      workingPlane: string;
      workingDimension: string;
      targetBlock: Block | undefined;
      constructor(block?: Block) {
        this.targetBlock = block;
        this.index = (this.targetBlock ? this.targetBlock.index : 0) + 1;
        this.workingPlane = this.index % 2 ? 'x' : 'z';
        this.workingDimension = this.index % 2 ? 'width' : 'depth';
        this.dimension.width = this.targetBlock ? this.targetBlock.dimension.width : 10;
        this.dimension.height = this.targetBlock ? this.targetBlock.dimension.height : 2;
        this.dimension.depth = this.targetBlock ? this.targetBlock.dimension.depth : 10;
        this.position.x = this.targetBlock ? this.targetBlock.position.x : 0;
        this.position.y = this.dimension.height * this.index;
        this.position.z = this.targetBlock ? this.targetBlock.position.z : 0;
        this.colorOffset = this.targetBlock ? this.targetBlock.colorOffset : Math.round(Math.random() * 100);
        if (!this.targetBlock) {
          this.color = 0x333344;
        } else {
          let offset = this.index + this.colorOffset;
          var r = Math.sin(0.3 * offset) * 55 + 200;
          var g = Math.sin(0.3 * offset + 2) * 55 + 200;
          var b = Math.sin(0.3 * offset + 4) * 55 + 200;
          this.color = new THREE.Color(r / 255, g / 255, b / 255);
        }
        this.state = this.index > 1 ? this.STATES.ACTIVE : this.STATES.STOPPED;
        this.speed = -0.1 - this.index * 0.005;
        if (this.speed < -4) this.speed = -4;
        this.direction = this.speed;
        let geometry = new THREE.BoxGeometry(this.dimension.width, this.dimension.height, this.dimension.depth);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(this.dimension.width / 2, this.dimension.height / 2, this.dimension.depth / 2));
        this.material = new THREE.MeshToonMaterial({ color: this.color });
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        if (this.state === this.STATES.ACTIVE) {
          this.position[this.workingPlane] = Math.random() > 0.5 ? -this.MOVE_AMOUNT : this.MOVE_AMOUNT;
        }
      }
      reverseDirection() {
        this.direction = this.direction > 0 ? this.speed : Math.abs(this.speed);
      }
      place(): BlockReturn {
        this.state = this.STATES.STOPPED;
        let overlap = this.targetBlock!.dimension[this.workingDimension] - Math.abs(this.position[this.workingPlane] - this.targetBlock!.position[this.workingPlane]);
        let blocksToReturn: BlockReturn = {
          plane: this.workingPlane as 'x' | 'z',
          direction: this.direction,
        };
        if (this.dimension[this.workingDimension] - overlap < 0.3) {
          overlap = this.dimension[this.workingDimension];
          blocksToReturn.bonus = true;
          this.position[this.workingPlane] = this.targetBlock!.position[this.workingPlane];
          this.dimension.width = this.targetBlock!.dimension.width;
          this.dimension.depth = this.targetBlock!.dimension.depth;
        }
        if (overlap > 0) {
          let choppedDimensions: { [key: string]: number; width: number; height: number; depth: number } = { ...this.dimension };
          choppedDimensions[this.workingDimension] -= overlap;
          this.dimension[this.workingDimension] = overlap;
          let placedGeometry = new THREE.BoxGeometry(this.dimension.width, this.dimension.height, this.dimension.depth);
          placedGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(this.dimension.width / 2, this.dimension.height / 2, this.dimension.depth / 2));
          let placedMesh = new THREE.Mesh(placedGeometry, this.material);
          let choppedGeometry = new THREE.BoxGeometry(choppedDimensions.width, choppedDimensions.height, choppedDimensions.depth);
          choppedGeometry.applyMatrix4(new THREE.Matrix4().makeTranslation(choppedDimensions.width / 2, choppedDimensions.height / 2, choppedDimensions.depth / 2));
          let choppedMesh = new THREE.Mesh(choppedGeometry, this.material);
          let choppedPosition: { [key: string]: number } = { x: this.position.x, y: this.position.y, z: this.position.z };
          if (this.position[this.workingPlane] < this.targetBlock!.position[this.workingPlane]) {
            this.position[this.workingPlane] = this.targetBlock!.position[this.workingPlane];
          } else {
            choppedPosition[this.workingPlane] += overlap;
          }
          placedMesh.position.set(this.position.x, this.position.y, this.position.z);
          choppedMesh.position.set(choppedPosition.x, choppedPosition.y, choppedPosition.z);
          blocksToReturn.placed = placedMesh;
          if (!blocksToReturn.bonus) blocksToReturn.chopped = choppedMesh;
        } else {
          this.state = this.STATES.MISSED;
        }
        this.dimension[this.workingDimension] = overlap;
        return blocksToReturn;
      }
      tick() {
        if (this.state === this.STATES.ACTIVE) {
          let value = this.position[this.workingPlane];
          if (value > this.MOVE_AMOUNT || value < -this.MOVE_AMOUNT) this.reverseDirection();
          this.position[this.workingPlane] += this.direction;
          this.mesh.position[this.workingPlane] = this.position[this.workingPlane];
        }
      }
    }

    class Game {
      STATES: { [key: string]: string; LOADING: string; PLAYING: string; READY: string; ENDED: string; RESETTING: string } = {
        LOADING: 'loading',
        PLAYING: 'playing',
        READY: 'ready',
        ENDED: 'ended',
        RESETTING: 'resetting',
      };
      blocks: Block[] = [];
      state: string = this.STATES.LOADING;
      newBlocks: any;
      placedBlocks: any;
      choppedBlocks: any;
      scoreContainer: HTMLElement;
      mainContainer: HTMLElement;
      startButton: HTMLElement;
      instructions: HTMLElement;
      stage: Stage;
      constructor() {
        this.stage = new Stage();
        this.mainContainer = document.getElementById('container')!;
        this.scoreContainer = document.getElementById('score')!;
        this.startButton = document.getElementById('start-button')!;
        this.instructions = document.getElementById('instructions')!;
        this.scoreContainer.innerHTML = '0';
        this.newBlocks = new THREE.Group();
        this.placedBlocks = new THREE.Group();
        this.choppedBlocks = new THREE.Group();
        this.stage.add(this.newBlocks);
        this.stage.add(this.placedBlocks);
        this.stage.add(this.choppedBlocks);
        this.addBlock();
        this.tick();
        this.updateState(this.STATES.READY);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('click', this.handleClick);
      }
      updateState(newState: string) {
        for (let key in this.STATES) this.mainContainer.classList.remove(this.STATES[key]);
        this.mainContainer.classList.add(newState);
        this.state = newState;
      }
      handleKeyDown(e: KeyboardEvent) {
        if (e.keyCode === 32) this.onAction();
      }
      handleClick(e: MouseEvent) {
        this.onAction();
      }
      onAction() {
        switch (this.state) {
          case this.STATES.READY:
            this.startGame();
            break;
          case this.STATES.PLAYING:
            this.placeBlock();
            break;
          case this.STATES.ENDED:
            this.restartGame();
            break;
        }
      }
      startGame() {
        if (this.state !== this.STATES.PLAYING) {
          this.scoreContainer.innerHTML = '0';
          this.updateState(this.STATES.PLAYING);
          this.addBlock();
        }
      }
      restartGame() {
        this.updateState(this.STATES.RESETTING);
        let oldBlocks = this.placedBlocks.children;
        let removeSpeed = 0.2;
        let delayAmount = 0.02;
        for (let i = 0; i < oldBlocks.length; i++) {
          TweenLite.to(oldBlocks[i].scale, removeSpeed, {
            x: 0,
            y: 0,
            z: 0,
            delay: (oldBlocks.length - i) * delayAmount,
            ease: Power1.easeIn,
            onComplete: () => this.placedBlocks.remove(oldBlocks[i]),
          });
          TweenLite.to(oldBlocks[i].rotation, removeSpeed, {
            y: 0.5,
            delay: (oldBlocks.length - i) * delayAmount,
            ease: Power1.easeIn,
          });
        }
        let cameraMoveSpeed = removeSpeed * 2 + oldBlocks.length * delayAmount;
        this.stage.setCamera(2, cameraMoveSpeed);
        let countdown = { value: this.blocks.length - 1 };
        TweenLite.to(countdown, cameraMoveSpeed, {
          value: 0,
          onUpdate: () => {
            this.scoreContainer.innerHTML = String(Math.round(countdown.value));
          },
        });
        this.blocks = this.blocks.slice(0, 1);
        setTimeout(() => {
          this.startGame();
        }, cameraMoveSpeed * 1000);
      }
      placeBlock() {
        let currentBlock = this.blocks[this.blocks.length - 1];
        let newBlocks: BlockReturn = currentBlock.place();
        this.newBlocks.remove(currentBlock.mesh);
        if (newBlocks.placed) this.placedBlocks.add(newBlocks.placed);
        if (newBlocks.chopped) {
          this.choppedBlocks.add(newBlocks.chopped);
          let positionParams: any = { y: '-=30', ease: Power1.easeIn, onComplete: () => this.choppedBlocks.remove(newBlocks.chopped) };
          let rotateRandomness = 10;
          let rotationParams: any = {
            delay: 0.05,
            x: newBlocks.plane === 'z' ? Math.random() * rotateRandomness - rotateRandomness / 2 : 0.1,
            z: newBlocks.plane === 'x' ? Math.random() * rotateRandomness - rotateRandomness / 2 : 0.1,
            y: Math.random() * 0.1,
          };
          if (newBlocks.chopped.position[newBlocks.plane] > newBlocks.placed.position[newBlocks.plane]) {
            positionParams[newBlocks.plane] = '+=' + 40 * Math.abs(newBlocks.direction);
          } else {
            positionParams[newBlocks.plane] = '-=' + 40 * Math.abs(newBlocks.direction);
          }
          TweenLite.to(newBlocks.chopped.position, 1, positionParams);
          TweenLite.to(newBlocks.chopped.rotation, 1, rotationParams);
        }
        this.addBlock();
      }
      addBlock() {
        let lastBlock = this.blocks[this.blocks.length - 1];
        if (lastBlock && lastBlock.state === lastBlock.STATES.MISSED) {
          return this.endGame();
        }
        this.scoreContainer.innerHTML = String(this.blocks.length - 1);
        let newKidOnTheBlock = new Block(lastBlock);
        this.newBlocks.add(newKidOnTheBlock.mesh);
        this.blocks.push(newKidOnTheBlock);
        this.stage.setCamera(this.blocks.length * 2);
        if (this.blocks.length >= 5) this.instructions.classList.add('hide');
      }
      endGame() {
        this.updateState(this.STATES.ENDED);
      }
      tick() {
        this.blocks[this.blocks.length - 1].tick();
        this.stage.render();
        requestAnimationFrame(() => {
          this.tick();
        });
      }
      cleanup() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('click', this.handleClick);
        this.stage.dispose();
      }
    }

    // Start the game
    let gameInstance = new Game();
    // Cleanup on unmount
    return () => {
      gameInstance.cleanup();
      // Remove the renderer's canvas
      const gameDiv = document.getElementById('game');
      if (gameDiv) {
        while (gameDiv.firstChild) {
          gameDiv.removeChild(gameDiv.firstChild);
        }
      }
    };
    // --- Stack Game Logic End ---
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex flex-col items-center justify-center relative">
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/games"
          className="inline-flex items-center text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Link>
      </div>
      <div id="container">
        <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
        <div id="game"></div>
        <div id="score" className="text-white z-20">0</div>
        <div id="instructions" className="text-white z-20">
          <h1 className="text-4xl font-bold mb-2">Stack Game</h1>
          <p className="text-lg mb-2">Click or press the spacebar to stack the blocks as high as you can!</p>
          <span>Click (or press the spacebar) to place the block</span>
        </div>
        <div className="game-over text-white z-20">
          <h2>Game Over</h2>
          <p>You did great, you're the best.</p>
          <p>Click or spacebar to start again</p>
        </div>
        <div className="game-ready z-20">
          <div id="start-button">Start</div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default StackGame; 