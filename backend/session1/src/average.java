import java.util.Scanner;
public class average {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("\nNhập điểm Toán");
        float math = input.nextFloat();
        System.out.println("\nNhập điểm Lý");
        float physics = input.nextFloat();
        System.out.println("\nNhập điểm Hóa");
        float chemistry = input.nextFloat();
        System.out.println("\nNhập điểm Văn");
        float literature = input.nextFloat();
        System.out.println("\nNhập điểm Anh Văn");
        float english = input.nextFloat();
        float averageCore;
        averageCore=(math+physics+chemistry+literature+english)/5;
        System.out.print(averageCore);
        if (0<=averageCore&&averageCore<5){
            System.out.println(" Xếp loại yếu");
        }else if (5<=averageCore&&averageCore<6.5){
            System.out.println(" Xếp loại trung bình");
        }else if (6.5<=averageCore&&averageCore<8){
            System.out.println(" Xếp loại Khá");
        }else if (8<=averageCore&&averageCore<9){
            System.out.println(" Xếp loại giỏi");
        }else {
            System.out.println(" Xếp loại xuất sắc");
        }
    }
}