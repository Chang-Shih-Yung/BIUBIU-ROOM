import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor(_options)
    {
        // Options
        this.experience = new Experience()
        this.config = this.experience.config
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.targetElement = this.experience.targetElement
        this.scene = this.experience.scene
        
        // Set up
        this.mode = 'default' // default \ debug

        this.setInstance()
        this.setModes()
    }

    setInstance()
    {
        // Set up
        //用innerWidth和innerHeight來設定相機的寬高比
        this.instance = new THREE.PerspectiveCamera( 20, innerWidth / innerHeight, 4, 200000 );
        this.instance.rotation.reorder('YXZ')
        this.scene.add(this.instance)
    }
    //
    setModes()
    {
        this.modes = {}

        // Default
        this.modes.default = {}
        this.modes.default.instance = this.instance.clone()
        this.modes.default.instance.rotation.reorder('YXZ')

        // Debug
        this.modes.debug = {}
        this.modes.debug.instance = this.instance.clone()
        this.modes.debug.instance.rotation.reorder('YXZ')
        this.modes.debug.instance.position.set(- 15, 15, 15)
        
        this.modes.debug.orbitControls = new OrbitControls(this.modes.debug.instance, this.targetElement)
        this.modes.debug.orbitControls.enabled = false//啟用控制
        this.modes.debug.orbitControls.screenSpacePanning = false//啟用屏幕空間平移
        this.modes.debug.orbitControls.enableKeys = false//禁用鍵盤
        this.modes.debug.orbitControls.enablePan = false//禁用平移
        this.modes.debug.orbitControls.zoomSpeed = 1.25  //縮放速度
        //
        this.modes.debug.orbitControls.enableDamping = true //啟用阻尼
        this.modes.debug.orbitControls.enableZoom = false; // 禁用缩放功能
        this.modes.debug.orbitControls.dampingFactor = 0.1; // 阻尼係數
        this.modes.debug.orbitControls.maxPolarAngle = Math.PI / 1;
        this.modes.debug.orbitControls.minPolarAngle = Math.PI / 1;
        //縮小
        this.modes.debug.orbitControls.maxDistance = 1;
        this.modes.debug.orbitControls.minDistance = 1;
        // console.log('OrbitControls settings:', this.modes.debug.orbitControls.maxDistance);
        console.log('OrbitControls settings:', this.modes.debug.orbitControls);
        this.modes.debug.orbitControls.update()
    }


    resize()
    {
        this.instance.aspect = this.config.width / this.config.height
        this.instance.updateProjectionMatrix()

        this.modes.default.instance.aspect = this.config.width / this.config.height
        this.modes.default.instance.updateProjectionMatrix()

        this.modes.debug.instance.aspect = this.config.width / this.config.height
        this.modes.debug.instance.updateProjectionMatrix()
    }

    update()
    {
        // Update debug orbit controls
        this.modes.debug.orbitControls.update()

        // Apply coordinates
        this.instance.position.copy(this.modes[this.mode].instance.position)
        this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)
        this.instance.updateMatrixWorld() // To be used in projection
    }

    destroy()
    {
        this.modes.debug.orbitControls.destroy()
    }
}
