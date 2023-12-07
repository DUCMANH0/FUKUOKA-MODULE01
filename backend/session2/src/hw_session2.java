import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class hw_session2 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Khởi tạo danh sách email
        ArrayList<String> emailList = new ArrayList<>();

        // Nhập danh sách email
        for (int i = 0; i < 10; i++) {
            System.out.print("Nhập email của bạn thứ " + (i + 1) + ": ");
            String email = scanner.nextLine();

            // Kiểm tra định dạng email
            if (isValidEmail(email)) {
                emailList.add(email);
            } else {
                System.out.println("Email không hợp lệ. Vui lòng nhập lại.");
                i--; // Để nhập lại email nếu nó không hợp lệ
            }
        }

        // Sắp xếp danh sách theo thứ tự A-Z
        Collections.sort(emailList);

        // Hiển thị danh sách email
        displayEmailList(emailList);
    }

    // Phương thức kiểm tra định dạng email
    private static boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    // Phương thức hiển thị danh sách email
    private static void displayEmailList(ArrayList<String> emailList) {
        System.out.println("+----------------------+");
        System.out.println("|   Danh sách email    |");
        System.out.println("+----------------------+");

        for (String email : emailList) {
            System.out.println("| " + email + "  |" );
        }

        System.out.println("+----------------------+");
    }
}