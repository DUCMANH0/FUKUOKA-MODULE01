import java.util.Scanner;
import java.util.function.Function;

public class intToChar {
    public static void main(String[] args) {
        String[] text = {"","một","hai","ba","bốn","năm","sáu","bảy","tám","chín","mười",""};

        Scanner input = new Scanner(System.in);
        System.out.println("\nNhap so");
        int valueInput = input.nextInt();
        int donVi = valueInput%10;

        double hc = Math.floor((valueInput%100)/10);
        int hangChuc = (int) hc;
        double ht = Math.floor(valueInput/100);
        int hangTram = (int) ht;
        if (valueInput<=10){
            System.out.println(text[valueInput]);
        }else if (10<valueInput&&valueInput<20){
            if (donVi==5){
                text[5] = "lăm";
            }
            System.out.printf("\n %s %s",text[10],text[donVi]);
        }else if (20<=valueInput&&valueInput<100){
            if (donVi==0){
                text[donVi] = "";
            }
            if (donVi==5&&hangChuc==5){
                System.out.printf("\n %s mươi lăm",text[hangChuc]);
            }else {
                text[5] = "lăm";
                System.out.printf("\n %s mươi %s",text[hangChuc],text[donVi]);
            }
        }else {
            if (hangChuc==0&donVi==0){
                System.out.printf("\n%s trăm",text[hangTram]);
            } else if (hangChuc==0){
                System.out.printf("\n%s trăm linh %s",text[hangTram],text[donVi]);
            } else if (hangChuc==1&donVi==0){
                System.out.printf("\n%s trăm mười",text[hangTram]);
            } else if (hangChuc==1){
                if (donVi==5){
                    text[5] = "lăm";
                }
                System.out.printf("\n%s trăm mười %s",text[hangTram],text[donVi]);
            } else if (donVi==0){
                System.out.printf("\n%s trăm %s mươi",text[hangTram],text[hangChuc]);
            } else {
                if (donVi==5&&hangChuc==5&hangTram==5){
                    System.out.println("\n năm trăm năm mươi lăm");
                } else if (donVi==5&&hangChuc==5){
                    System.out.printf("\n%s trăm %s mươi lăm",text[hangTram],text[hangChuc]);
                }else {
                    System.out.printf("\n%s trăm %s mươi %s",text[hangTram],text[hangChuc],text[donVi]);
                }

            }
        }

    }
}