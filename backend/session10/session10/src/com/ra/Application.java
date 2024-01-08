package com.ra;
import com.ra.entity.impl.Book;
import com.ra.service.BookService;
import com.ra.service.impl.BookServiceImpl;

import java.util.Scanner;

public class Application {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        BookService service = new BookServiceImpl();
        service.load();

        while (true) {
            System.out.println("1. Nhập thông tin sách");
            System.out.println("2. Hiển thị thông tin sách");
            System.out.println("3. Cập nhật thông tin sách theo mã sách");
            System.out.println("4. Xóa sách theo mã sách");
            System.out.println("5. Sắp xếp sách theo giá bán tăng dần");
            System.out.println("6. Thống kê sách theo khoảng giá (a-b nhập từ bàn phím)");
            System.out.println("7. Tìm kiếm sách theo tên tác giả");
            System.out.println("8. Thoát");
            System.out.print("Chọn chức năng: ");
            int choose = Integer.parseInt(sc.nextLine());
            switch (choose) {
                case 1:
                    Book book = new Book();
                    book.inputData(sc);
                    service.add(book);
                    break;
                case 2:
                    for (Book b : service.findAll()) {
                        b.displayData();
                    }
                    break;
                case 3:
                    System.out.print("Nhập mã sách: ");
                    int id = Integer.parseInt(sc.nextLine());
                    Book edit = service.findId(id);
                    if (edit != null) {
                        edit.inputData(sc);
                    } else {
                        System.out.println("Không tìm thấy id="+id);
                    }
                    break;
                case 4:
                    System.out.print("Nhập mã sách: ");
                    int idDel = Integer.parseInt(sc.nextLine());
                    service.remove(idDel);
                    break;
                case 5:
                    System.out.println("Sắp xếp theo giá tăng dần");
                    for (Book b : service.sortByPrice()) {
                        b.displayData();
                    }
                    break;
                case 6:
                    System.out.println("Tìm kiếm theo khoảng giá");
                    System.out.print("Từ: ");
                    float from = Float.parseFloat(sc.nextLine());
                    System.out.print("Đến: ");
                    float to = Float.parseFloat(sc.nextLine());
                    for (Book b : service.findPriceBetween(from, to))
                        b.displayData();
                    break;
                case 7:
                    System.out.print("Tên tác giả: ");
                    String author = sc.nextLine();
                    for (Book b : service.findByAuthor(author))
                        b.displayData();
                    break;
                case 8:
                    service.save();
                    System.exit(0);
                    break;
                default:
                    System.out.println("Bạn chọn sai chức năng!");
                    break;
            }
        }
    }
}
