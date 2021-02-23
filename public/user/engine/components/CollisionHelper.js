import RectangleCollider from "./RectangleCollider.js"
import PointCollider from "./PointCollider.js";

export default class CollisionHelper{
   
    static inCollision(one, two){
        if(one.collider instanceof RectangleCollider && two.collider instanceof PointCollider){
            let w = one.collider.w;
            let h = one.collider.h;
            // one.gameObject.components.filter(i => i.w).forEach(i => w = i.w);
            // one.gameObject.components.filter(i => i.h).forEach(i => h = i.h);
            
            let TLx = one.gameObject.location.x - 0.5 * w;
            let TLy = one.gameObject.location.y - 0.5 * h;
            let BRx = one.gameObject.location.x + 0.5 * w;
            let BRy = one.gameObject.location.y + 0.5 * h;
            let Px = two.gameObject.location.x + one.gameObject.pX;
            let Py = two.gameObject.location.y + one.gameObject.pY;

            if(TLx < Px && Px < BRx && TLy < Py && Py < BRy)
                return true;
            return false;
        }
        else if(one.collider instanceof PointCollider && two.collider instanceof RectangleCollider){
            return this.inCollision(two,one);
        }          
    }
}