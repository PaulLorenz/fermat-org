<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
        <link type="text/css" rel="stylesheet" href="styles.css"/>
        <link type="text/css" rel="stylesheet" href="common/vis.min.css"/>
	</head>
	<body>
		<script src="common/three.min.js"></script>
		<script src="common/tween.min.js"></script>
		<script src="common/TrackballControls.js"></script>
		<script src="common/CSS3DRenderer.js"></script>
        <script src="common/jquery-2.1.4.min.js"></script>
        <script src="common/vis.min.js"></script>
        
        <button class="backButton" style="opacity : 0;">BACK</button>
        <button id="legendButton"> ? </button>
        
        <div id="legend" class="legend" style="opacity : 0;">
            <table>
                <tr>
                    <td><div class="colorBox" style="background-color: rgba(150,150,150,0.5);"></div></td>
                    <td><span>Concept</span></td>
                </tr>
                <tr>
                    <td><div class="colorBox" style="background-color: rgba(244,133,107,0.5);"></div></td>
                    <td><span>Development</span></td>
                </tr>
                <tr>
                    <td><div class="colorBox" style="background-color: rgba(244,244,107,0.5);"></div></td>
                    <td><span>QA</span></td>
                </tr>
                <tr>
                    <td><div class="colorBox" style="background-color: rgba(80,188,107,0.5);"></div></td>
                    <td><span>Production</span></td>
                </tr>
            </table>
        </div>
        
		<div id="container"></div>
        
        <?php
            //Disabled
            /*<div id="menu">
                <button id="table">TABLE</button>
                <button id="sphere">SPHERE</button>
                <button id="helix">HELIX</button>
                <button id="grid">GRID</button>
            </div>*/
        ?>
        
        <script src="constants.js"></script>
		<script src="viewer.js"></script>
	</body>
</html>