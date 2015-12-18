function ClientsViewer(parentNode) {
    
    BaseNetworkViewer.call(this);
    
    this.parentNode = parentNode;
    this.nodes = {};
    this.edges = [];
    this.NET_RADIOUS = 1000;
    this.childNetwork = null;
}

ClientsViewer.prototype = Object.create(BaseNetworkViewer.prototype);
ClientsViewer.prototype.constructor = ClientsViewer;

/**
 * Creates a sprite representing a single node
 * @author Miguel Celedon
 * @param   {object}        nodeData      The data of the actual node
 * @param   {THREE.Vector3} startPosition The starting position of the node
 * @returns {Three.Sprite}  The sprite representing the node
 */
ClientsViewer.prototype.createNode = function(nodeData, startPosition) {

    var sprite = new THREE.Sprite(new THREE.SpriteMaterial({color : 0x0000ff}));
    var id = nodeData.id.toString();
    
    sprite.userData = {
        id : id,
        originPosition : startPosition,
        onClick : this.onNodeClick.bind(this)
    };

    sprite.position.copy(startPosition);

    this.nodes[id] = nodeData;
    this.nodes[id].sprite = sprite;

    return sprite;
};

/**
 * Draws the nodes in the network
 * @author Miguel Celedon
 * @param {Array} networkNodes Array of nodes to draw
 */
ClientsViewer.prototype.drawNodes = function(networkNodes) {

    for(var i = 0; i < networkNodes.length; i++) {

        var position = new THREE.Vector3(
            Math.random() * this.NET_RADIOUS,
            - this.NET_RADIOUS / 2,
            Math.random() * this.NET_RADIOUS);
        
        position.add(this.parentNode.position);

        var sprite = this.createNode(networkNodes[i], position);

        sprite.scale.set(500, 500, 1.0);

        window.scene.add(sprite);
    }

    this.createEdges();
};

ClientsViewer.prototype.test_load = function() {
    
    var networkNodes = [];
    var NUM_NODES = 5;
    
    for(var i = 0; i < NUM_NODES; i++) {
        
        var node = {
            id : i,
            edges : [{id : this.parentNode.userData.id}]
        };
        
        networkNodes.push(node);
    }
    
    return networkNodes;
    
};

ClientsViewer.prototype.createEdges = function() {
    
    for(var nodeID in this.nodes) {
        
        var origin = this.nodes[nodeID].sprite.position;
        var dest = this.parentNode.position;
        
        var lineGeo = new THREE.Geometry();
        lineGeo.vertices.push(origin, dest);

        var line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({color : 0x0000ff}));
        line.visible = false;

        scene.add(line);
        this.edges.push({
            from : nodeID,
            to : this.parentNode.userData.id,
            line : line
        });
    }
    
    this.showEdges();
    
    //Not needed now
    //BaseNetworkViewer.prototype.createEdges.call(this);
};

/**
 * Closes and unloads the child, if the child is open, closes it
 * @author Miguel Celedon
 * @returns {object} The reference to itself, if there was no children I'll return null
 */
ClientsViewer.prototype.closeChild = function() {
    
    var self = null;
    
    if(this.childNetwork !== null){
        //TODO
        self = this;
    }
    else {
        this.close();
        this.unload();
    }
    
    return self;
    
};