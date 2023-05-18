function StereoCamera(  
        Convergence,
        EyeSeparation,
        AspectRatio,
        FOV,
        NearClippingDistance,
        FarClippingDistance
        )
{
    this.Convergence            = Convergence;
    this.EyeSeparation          = EyeSeparation;
    this.AspectRatio            = AspectRatio;
    this.FOV                    = FOV * Math.PI / 180.0;
    this.NearClippingDistance   = NearClippingDistance;
    this.FarClippingDistance    = FarClippingDistance;


    this.ApplyLeftFrustum = function()
    {
        let top, bottom, left, right;

        top     = NearClippingDistance * Math.tan(FOV / 2.0);
        bottom  = -top;

        let a = AspectRatio * Math.tan(FOV / 2.0) * Convergence;
        let b = a - EyeSeparation / 2.0;
        let c = a + EyeSeparation / 2.0;

        left    = -b * NearClippingDistance / Convergence;
        right   =  c * NearClippingDistance / Convergence;
 
        // Set the Projection Matrix
        let ProjectionMatrix = m4.frustum(left, right, bottom, top,
            NearClippingDistance, FarClippingDistance);
 
        // Displace the world to right
        let ViewMatrix = m4.translation(EyeSeparation / 2.0, 0.0, 0.0);

        return [ViewMatrix, ProjectionMatrix];
    }

    this.ApplyRightFrustum = function()
    {
        let top, bottom, left, right;

        top     = NearClippingDistance * Math.tan(FOV / 2.0);
        bottom  = -top;

        let a = AspectRatio * Math.tan(FOV / 2.0) * Convergence;
        let b = a - EyeSeparation / 2.0;
        let c = a + EyeSeparation / 2.0;
 
        left    =  -c * NearClippingDistance / Convergence;
        right   =   b * NearClippingDistance / Convergence;
 
        // Set the Projection Matrix
        let ProjectionMatrix = m4.frustum(left, right, bottom, top,
            NearClippingDistance, FarClippingDistance);
 
        // Displace the world to left
        let ViewMatrix = m4.translation(-EyeSeparation / 2.0, 0.0, 0.0);

        return [ViewMatrix, ProjectionMatrix];
    }
} 
