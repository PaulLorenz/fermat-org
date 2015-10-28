/**
 * @author Ricardo Delgado
 * Create screenshots of android with your images and functions.
 */
function ScreenshotsAndroid() {

    var action = { state : false, mesh : null };

    this.objects = {
            mesh : [],
            target : [],
            texture : []
        };

    var self = this,
        POSITION_X = 231;
    
    var onClick = function (target) {
        change(target.userData.id);
    };

    /**
    * @author Ricardo Delgado
    * Initialization screenshots.
    */
    this.init = function () {

     addWallet('publisher');
     addWallet('factory');
     addWallet('store');


     addMesh (window.tileManager.targets.table[75].position.x, 'factory', false); 
     addMesh (window.tileManager.targets.table[76].position.x, 'publisher', false);
     addMesh (window.tileManager.targets.table[77].position.x, 'store', false);
     // Plano donde se muestra el cuarto capture no tiene por qué visualizarse.
     // El false cuando tiene una posicion definida y true cuando no lo tiene.
     // Eliminar cuando crezca la cantidad de las fichitas a cuatro (4)!!!  
     addMesh (Math.random() * 80000 , 'store', true);

    };

    /**
    * @author Ricardo Delgado
    * Each drawing screenshots of wallet.
    * @param {String}  wallet   Wallet draw. 
    */
    function addWallet (wallet) {

     for (var i = 1; i <= 4; i++) {

          addTexture (wallet, i);
     }

    }

    /**
    * @author Ricardo Delgado
    * Search for a wallet in specific in the variable self.objects.texture.
    * @param {String}  wallet   Group wallet to find.
    * @param {Number}    id     Wallet identifier. 
    */
    function searchWallet (wallet, id) {

     var i = 0;

     while( self.objects.texture[i].wallet != wallet || self.objects.texture[i].id != id ) {

             i = i + 1 ;

       }  

     return self.objects.texture[i].image;

    }

    /**
    * @author Ricardo Delgado
    * The plans necessary for the wallet are added, each level is for a group of wallet.
    * @param {String}  _position    End position of the plane in the x axis.
    * @param {String}    wallet     Wallet group to which it belongs.
    */   
    function addMesh (_position, wallet, state) {

      var id = self.objects.mesh.length,
          px = Math.random() * 80000 - 40000,
          py = Math.random() * 80000 - 40000,
          pz = 80000 * 2,
          rx = Math.random() * 180,
          ry = Math.random() * 180,
          rz = Math.random() * 180,
          z = 0,
          _texture = searchWallet ( wallet, 1 );

          if (state) z = pz;

      var mesh = new THREE.Mesh(
                 new THREE.PlaneGeometry( 50, 80 ),
                 new THREE.MeshBasicMaterial( { map:_texture, side: THREE.FrontSide, transparent: true } )
                 );

      mesh.material.needsUpdate = true;

      mesh.userData = {
          id : id,
          wallet : wallet,
          onClick : onClick
      };

      mesh.material.opacity = 1;

      mesh.scale.set( 4, 4, 4 );

      var target = { x : _position, y : window.tileManager.dimensions.layerPositions[3] + 240, z : z,
                     px : px, py : py, pz : pz,
                     rx : rx, ry : ry, rz : rz };

      mesh.position.set( px, py, pz );
      mesh.rotation.set( rx, ry, rz );

      window.scene.add(mesh);

      self.objects.target.push(target);

      self.objects.mesh.push(mesh);

    }

    /**
    * @author Ricardo Delgado
    * Wallet drawn and added required.
    * @param {String}    wallet    Wallet draw.
    * @param {String}      i       Group identifier wallet.
    */ 
    function addTexture (wallet, i) {

      var _texture,
          image;

      image = new THREE.ImageUtils.loadTexture("images/screenshots_android/wallet_"+wallet+"_"+i+".png");
      image.needsUpdate = true;  
      image.minFilter = THREE.NearestFilter;

      _texture = { id : i, wallet : wallet, image : image };

      self.objects.texture.push(_texture);

    }

    /**
    * @author Ricardo Delgado
    * Wallet hidden from view.
    */ 
    this.hide = function () {

      var ignore;

      if (action.state) ignore = action.mesh;

      for(var i = 0; i < self.objects.mesh.length; i++) { 

          if (i != ignore)  

          animate(self.objects.mesh[i], self.objects.target[i], false, 1500);

      }

    }; 

    /**
    * @author Ricardo Delgado
    * Show wallet sight.
    */ 
    this.show = function () {


     if (action.state) { 

      resetTexture(action.mesh);
     }
     else { 

         for (var i = 0; i < self.objects.mesh.length; i++) { 

         animate(self.objects.mesh[i], self.objects.target[i], true, 2000);

         }
     }

    };

    /**
    * @author Ricardo Delgado
    * Wallet focus and draw the other planes in the same group wallet.
    * @param {Number}    id    Wallet identifier focus.
    */ 
    function change (id) {

     if (window.camera.getFocus() === null) {

         action.state = true; action.mesh = id;

         window.camera.setFocusScreenshots(id, 2000);

         window.browserManager.modifyButtonBack(1, 'block');

         positionFocus(id);

         window.camera.disable();

      }

    }

    /**
    * @author Ricardo Delgado
    * Accommodate the wallet.
    * @param {Number}    id    Identifier reference wallet.
    */ 
    function positionFocus (id) {

     var ignore = id,
         mesh = self.objects.mesh[id],
         wallet = mesh.userData.wallet,
         target,
         x = POSITION_X;

     target = { x: mesh.position.x - (x / 2), y : mesh.position.y, z : mesh.position.z };

     animate(mesh, target, true, 1000);

     setTimeout( function() { loadTexture(wallet, ignore); addTitle(wallet); }, 500 );

     setTimeout( function() { 

         for(var i = 0; i < self.objects.mesh.length; i++) { 

             if ( i != ignore ) { 

                 var _mesh = self.objects.mesh[i];

                 if (x === POSITION_X) {

                    x = x * 2;
                 }
                 else if (x > POSITION_X) { 

                    x = (x / 2) * -1;
                 }
                 else { 

                    x = POSITION_X;
                 }

                 target = { x: mesh.position.x + x, y : mesh.position.y, z : mesh.position.z };

                 animate(_mesh, target, true, 2000);

              }             

          }

       }, 1500);

    }

    /**
    * @author Ricardo Delgado
    * Add the title of the group focused wallet.
    * @param {String}    text    Behalf of the wallet.
    */ 
    function addTitle(text) {

     var title = document.createElement('h5');
         title.id = 'titleScreenshots';
         title.style.position = 'absolute';
         title.innerHTML = "Wallet " + text;
         title.style.top = '70px';
         title.style.left = '46%';
         title.style.fontSize = "28px";
         title.style.zIndex = 10;
         title.style.opacity = 0;

         document.body.appendChild(title);

         window.helper.show(title, 2000);

    }

    /**
    * @author Ricardo Delgado
    * Texture change of plans regarding the group focused wallet.
    * @param {String}    wallet    Behalf of the wallet.
    * @param {Number}    ignore    Id focused wallet.
    */ 
    function loadTexture (wallet, ignore) {

     var id = 1,
         _mesh;

     for(var i = 0; i < self.objects.mesh.length; i++) { 

         if (i != ignore) { 

              id = id + 1 ;

              _mesh = self.objects.mesh[i];
              _mesh.material.map = searchWallet ( wallet, id ); 
              _mesh.material.needsUpdate = true;

          }

      } 

    }

    /**
    * @author Ricardo Delgado
    * Change texture of the planes to the original state.
    * @param {Number}    ignore    Id focused wallet.
    */   
    function resetTexture (ignore) {

     var title = document.getElementById('titleScreenshots'), 
         _mesh;

     self.hide(); 

     window.helper.hide(title, 1000);

     setTimeout(function() {    

         for(var i = 0; i < self.objects.mesh.length; i++) { 

             if (i != ignore) { 

                 _mesh = self.objects.mesh[i];
                 _mesh.material.map = searchWallet ( _mesh.userData.wallet, 1 ); 
                 _mesh.material.needsUpdate = true;

              }

          } 

         action.state = false;

         self.show();  

     }, 1000);

    }

    /**
    * @author Ricardo Delgado
    * Animation and out of the wallet.
    * @param {object}     mesh     Wallet.
    * @param {Number}    target    Coordinates wallet.
    * @param {Boolean}   state     Status wallet.
    * @param {Number}   duration   Animation length.
    */ 
    function animate (mesh, target, state, duration){

        var _duration = duration || 2000,
            x,
            y,
            z,
            rx,
            ry,
            rz;

        if (state) {

           x = target.x;
           y = target.y;
           z = target.z;
           
           rx = 0;
           ry = 0;
           rz = 0;
        } 
        else {

           x = target.px;
           y = target.py;
           z = target.pz;
           
           rx = target.rx;
           ry = target.ry;
           rz = target.rz; 
        }   

        new TWEEN.Tween(mesh.position)
            .to({x : x, y : y, z : z}, Math.random() * _duration + _duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .onUpdate(window.render)
            .start();

        new TWEEN.Tween(mesh.rotation)
            .to({x: rx, y: ry, z: rz}, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .onUpdate(window.render) 
            .start();

   }

}
