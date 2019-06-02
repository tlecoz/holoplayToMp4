class Demo extends HoloplayApp {
    constructor(textureQuality, viewQuality, useEppRom = true) {
        super(textureQuality, viewQuality, useEppRom);
        this.time = 0;
        var directionalLight = this.light = new THREE.DirectionalLight(0xFFFFFF, 2);
        directionalLight.position.set(0, 1, 2);
        this.scene.add(directionalLight);
        var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.01);
        this.scene.add(ambientLight);
        var cubes = this.cubes = [];
        var group = this.group = new THREE.Group();
        var cubeGeometry = new THREE.SphereGeometry(1, 30, 30);
        var cubeMaterial = new THREE.MeshLambertMaterial();
        var d = 35;
        var d2 = d / 2;
        var n;
        var c;
        for (var i = 0; i < 100; i++) {
            c = new THREE.Color(Math.random(), Math.random(), Math.random()).getHex();
            cubes.push(new THREE.Mesh(cubeGeometry, new THREE.MeshPhysicalMaterial({ color: c, metalness: Math.random() * 0.5, roughness: Math.random() * 0.25 })));
            cubes[i].material.needsUpdate = true;
            cubes[i].frustumCulled = false;
            cubes[i].position.set(d2 - Math.random() * d, d2 - Math.random() * d, d2 - Math.random() * d);
            cubes[i].rotation.set(Math.random(), Math.random(), Math.random());
            n = 1.5 + Math.random() * 1;
            cubes[i].scale.set(n, n * Math.random(), n * Math.random());
            group.add(cubes[i]);
        }
        this.scene.add(group);
    }
    update() {
        this.time += 0.01;
        const group = this.group;
        const cubes = this.cubes;
        group.rotation.y += 0.001;
        group.rotation.x += 0.0075;
        group.rotation.z += 0.0015;
        let i, len = cubes.length;
        for (i = 0; i < len; i++) {
            cubes[i].rotation.x += 0.01;
            cubes[i].rotation.y += 0.02;
            cubes[i].rotation.z += 0.03;
        }
        super.update();
    }
}
//# sourceMappingURL=Demo.js.map