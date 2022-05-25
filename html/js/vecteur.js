// Make a vector with coords of two points
function mkVect(a, b) {
    var u = [b[1]-a[1], b[0]-a[0]];
    return u;
}
// Return the norm of a vector
function norm(u) {
    return root(Math.pow(u[0], 2) + Math.pow(u[1], 2));
}
// Return the scalar product of two vectors (a is an angle in deg)
function sclProd(u, v, a) {
    if(typeof a != "undefined") {
        return norm(u) * norm(v) * cos(a);
    } else {
        return u[0] * v[0] + u[1] * v[1];
    }
}
