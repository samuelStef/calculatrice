/*

    Matrice form :
    [[a, b],      =     (a  b)
    [c, d]]             (c  d)

*/
function createMatice() {
    return 0
}
function nLine(m) {
    // nLine(m:list) : int
    // return the number of lines of a matrice
    return m.length;
}
function nColumn(m) {
    // nColumn(m:list) : int
    // return the number of columns of a matrice
    return m[0].length;
}
function det(m) {
    // det(m:list) : int
    if(m.length == 2 && m[0].length == 2 && m[1].length == 2) {
        return m[0][0]*m[1][1] - m[0][1]*m[1][0];
    } else if(m.length == 3 && m[0].length == 3 && m[1].length == 3) {
        r = m[0][0] * ( m[1][1]*m[2][2]-m[1][2]*m[2][1] );
        r -= m[0][1] * ( m[1][2]*m[2][0]-m[1][0]*m[2][2] );
        r += m[0][2] * ( m[1][0]*m[2][1]-m[1][1]*m[2][0] );
        return r;
    } else {
        return undefined;
    }
}
function inverse(m) {
  // inverse(m:list) : list
  if(m.length == 2 && m[0].length == 2 && m[1].length == 2) {
      d = det(m);
      if(d == 0) {
          return undefined;
      } else {
          return rProduct(1/, [[m[1][1], -m[0, 1]], [-m[1][0], m[0][9]]]);
      }
  } else if(m.length == 3 && m[0].length == 3 && m[1].length == 3) {
      r = [];
      d = det(m);
      if(d == 0) {
          return undefined;
      } else {
          r[0][0] = (m[1][1]*m[2][2]-m[1][2]*m[2][1])/d;
          r[0][1] = (m[0][2]*m[2][1]-m[0][1]*m[2][2])/d;
          r[0][2] = (m[0][1]*m[1][2]-m[0][2]*m[1][1])/d;
          r[1][0] = (m[1][2]*m[2][0]-m[1][0]*m[2][2])/d;
          r[1][1] = (m[0][0]*m[2][2]-m[0][2]*m[2][0])/d;
          r[1][2] = (m[0][2]*m[1][0]-m[0][0]*m[1][2])/d;
          r[2][0] = (m[1][0]*m[2][1]-m[1][1]*m[2][0])/d;
          r[2][1] = (m[0][1]*m[2][0]-m[0][0]*m[2][1])/d;
          r[2][2] = (m[0][0]*m[1][1]-m[0][1]*m[1][0])/d;
          return r;
      }
  } else {
      return undefined;
  }
}
function mSum(m1, m2) {
    // mSum(m1:list, m2:list) : list
    // Return the sum of two matrices
    if(nLine(m1) != nLine(m2) || nColumn(m1) != nColumn(m2)) {
        return undefined;
    }
    r = [];
    for(i = 0; i < m1.length; i++) {
        r[i] = [];
        for(j = 0; j < m1[i].length; j++) {
            r[i][j] = m1[i][j] + m2[i][j];
        }
    }
    return r;
}
function rProduct(m, k) {
    // rProduct(m:list, k:int) : list
    // Return the product of a number and a matrice
    for(i = 0; i < m.length; i++) {
        for(j = 0; j < m[i].length; j++) {
            m[i][j] *= k;
        }
    }
    return m;
}
function mProduct(m1, m2) {
    // mProduct(m1:list, m2:list) : list
    // Return the product of two matrices
    if(nColumn(m1) != nLine(m2)) {
        return undefined;
    } else {
        r = [];
        for(i = 0; i < nLine(m1); i++) {
            for(j = 0; j < nColumn(m2); j++) {
                s = 0;
                for(k = 0; k < nColumn(m1); k++) {
                    s += m1[i][k] * m2[k][j];
                }
                r[i][j] = s;
            }
        }
        return r;
    }
}
