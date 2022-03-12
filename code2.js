// con trường hợp bấm phép tính luôn thì như thế nào ?? 


var display = document.getElementById('ketqua') ; 

var array_Number = new Array() ; 
var leng_Number = 0 ; 

var array_Calculation  = new Array(); 
var leng_Calculation = 0 ; 

// biến để lưu button mới 
var button_New = '' ; 

var doi_dau = false; 

//biến đổi phép tính 
var doi_phep_tinh = false ;

//biến lưu phép tíh 
var calculation = ''; 

//biến đếm phép tính ưu tiên
var uu_tien = 0 ; 

function ClickButton(obj) 
{
    var giatri = obj.innerHTML ;
     
    if( giatri == '0'||
        giatri == '1'||
        giatri == '2'||
        giatri == '3'||
        giatri == '4'||
        giatri == '5'||
        giatri == '6'||
        giatri == '7'||
        giatri == '8'||
        giatri == '9'||
        giatri == '+/-'||
        giatri == '.' ) 
        {   
            doi_phep_tinh = false ; 
            if(giatri == '+/-'){
                if(doi_dau == true ){
                    doi_dau=false ; 
                    button_New = button_New.substring(1) ; 

                } else {
                    doi_dau = true ; 
                    button_New = '-' + button_New ; 
                }
            } else {
            // lưu phim mới vào button new
            button_New = button_New + giatri ; 
            }
            //hiển thị
            display.value = button_New ; 
        }
    else if( 
        giatri == '+' ||
        giatri == '-' ||
        giatri == 'x' ||
        giatri == '/'
    )
    {   
        // đổi phép tính , khi trước đó đã bấm phép tính 
        if(doi_phep_tinh == true ){
            if((calculation == 'x' || calculation == '/') && (giatri == '+' || giatri == '-') ){
                uu_tien -- ; 
            }
            if ((calculation == '+' || calculation == '-') && (giatri == 'x' || giatri == '/')){
                uu_tien++ ; 
            }
            // thay the mang phep tinh
            array_Calculation[leng_Calculation-1] = giatri ;
            display.value = ketqua.value.substring(0, ketqua.value.length - 1) + giatri ; 

    } // chưa có phép tính
    else {
        //lưu phép tính vào biến calculation 
        calculation = giatri ; 

        // lưu số vào mảng số 
        array_Number[leng_Number] = button_New ;
        leng_Number++ ; 

        // lưu phép tính vào mảng phép tính 
        array_Calculation[leng_Calculation] = giatri ; 
        leng_Calculation++; 

        if(calculation == 'x' || calculation =='/')
        {
            uu_tien ++ ; 
        }

        //hiển thị trên màn hình 
        display.value +=  giatri ; 
        } 
        
        doi_phep_tinh = true ; 
        button_New = '';
        
    }
    else if(
        giatri == '=' || giatri == '%'
    )
    {   
        array_Number[leng_Number] = parseFloat(button_New); 
        if(giatri == '=') {
            // gọi hàm tính 
            hamtinh() ; 
        }
        else {
            //gọi hàm phần trăm 
            hamphantram(); 
        }
        // reset 
        hamreset() ; 
    }
    //phím ce 
    else if (giatri == 'CE'){
        hamreset() ; 
        // hiển thij 
        display.value = '0' ; 
    }
    // phím xóa 
    else {
        if(button_New.length > 1){
            button_New = button_New.substring(0,button_New.length - 1); 
        } else { 
            button_New = '' ; 
        }
        // hiển thị 
        display.value = display.value.substring(0,display.value.length - 1); 
    }
}
function hamreset() {
    button_New = ''; 
    array_Number = new Array(); 
    leng_Number = 0 ; 
    array_Calculation = new Array(); 
    leng_Calculation = 0 ; 
    uu_tien = 0 ; 
    calculation = ''; 
    doi_dau = false ; 
    doi_phep_tinh = false ; 
}
function hamtinh() {
       leng_Calculation -- ; 
       while(uu_tien > 0) { 
           for(var index = 0; index <= leng_Calculation; index++){ 
               if(array_Calculation[index]=='x'||array_Calculation[index]=='/'){
                   // lấy 2 số trong mảng số 
                   var sh1 = array_Number[index];
                   var sh2 = array_Number[index +1]; 
                   // tính 
                   var ketqua = 0 ;
                   if(array_Calculation == 'x'){
                       ketqua = sh1 * sh2; 
                   } else {
                       if(sh2 == '0'){
                           display.value = 'error!!'; 
                           break; 
                           hamreset(); 
                       } else {
                       ketqua = sh1 / sh2 ; 
                       }
                   }
                   // thay thế số hạng; 
                   array_Number[index] = ketqua ; 
                   // dồn số hạng và dồn phép tinh
                   for(var new_index = index + 1; new_index < leng_Number; new_index++ ){
                       array_Number[new_index] = array_Number[new_index + 1]; 
                   }
                   leng_Number-- ; 
                   for(var new_index = index; new_index < leng_Calculation; new_index++){
                       array_Calculation[new_index] = array_Calculation[new_index+1]; 
                   }
                   leng_Calculation-- ; 
                

                   uu_tien-- ; 

                   break ;
               }
           }
       }
       // phep tinh thuong 
       while(leng_Number > 0){
           // lay 2 so hang 
           var sh1 = array_Number[0]; 
           var sh2 = array_Number[1]; 
           // tinh 
           var ketqua = 0; 
           if(array_Calculation[0] == '+'){
               ketqua = sh1 + sh2 ; 
           } else {
               ketqua = sh1 - sh2 ; 
           }
           // thay the so hang 
           array_Number[0] = ketqua ; 
           // don so hang 
           for(var new_index = 1; new_index < leng_Number; new_index++ ){
            array_Number[new_index] = array_Number[new_index + 1]; 
        }
            leng_Number-- ; 
            for(var new_index = 0; new_index < leng_Calculation; new_index++){
            array_Calculation[new_index] = array_Calculation[new_index+1]; 
        }
            leng_Calculation-- ; 
       }

       // in ket qua 
       display.value = array_Number[0]; 
}