package com.ra.entity.Impl;
import com.ra.entity.IBook;
import com.ra.exception.BookInputException;
import com.ra.service.BookService;
import com.ra.service.impl.BookServiceImpl;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;
public class Book implements IBook, Serializable {
    private static int incrementId = 1;
    private int bookId;
    private String bookName;
    private float importPrice;
    private float exportPrice;
    private String author;
    private Date created = new Date();
    private String description;

    public Book(int bookId) {
    }

    public Book(int bookId, String bookName, float importPrice, float exportPrice, String author, Date created, String description) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.importPrice = importPrice;
        this.exportPrice = exportPrice;
        this.author = author;
        this.created = created;
        this.description = description;
    }

    public static int getIncrementId() {
        return incrementId;
    }

    public static void setIncrementId(int incrementId) {
        Book.incrementId = incrementId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) throws Exception {
        if (bookName == null || bookName.length()  != 4)
            throw new BookInputException("Tên sách phải gồm 4 kí tự");
        if (!bookName.startsWith("B"))
            throw new BookInputException("Tên sách phải bắt đầu là \"B\"");
        BookService service = new BookServiceImpl();
        if (this.bookId == 0) { // trùng tên thêm mới
            if (service.findAny(b -> b.getBookName().equalsIgnoreCase(bookName)))
                throw new BookInputException("Tên sách đã tồn tại");
        } else { // trùng tên khi sửa
            if (service.findAny(b -> b.getBookName().equalsIgnoreCase(bookName) && b.getBookId() != this.bookId))
                throw new BookInputException("Tên sách đã tồn tại");
        }
        this.bookName = bookName;
    }

    public float getImportPrice() {
        return importPrice;
    }

    public void setImportPrice(float importPrice) throws Exception {
        if (importPrice <= 0)
            throw new BookInputException("Giá phải lớn hơn 0");
        this.importPrice = importPrice;
    }

    public float getExportPrice() {
        return exportPrice;
    }

    public void setExportPrice(float exportPrice) throws Exception {
        if (exportPrice <= importPrice)
            throw new BookInputException("Giá nhập phải lớn hơn giá bán(" + this.importPrice + ")");
        this.exportPrice = exportPrice;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) throws Exception {
        if (author == null || (author.length() < 6 || author.length() > 50))
            throw new BookInputException("Tên tác giả phải từ 6-50 kí tự");
        this.author = author;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) throws Exception {
        if (description == null || description.length() > 500)
            throw new BookInputException("Mô tả không quá 500 kí tự");
        this.description = description;
    }

    @Override
    public void inputData(Scanner scanner) {
        boolean invalid = true;
        do {
            try {
                System.out.print("Nhập tên sách: ");
                setBookName(scanner.nextLine());
                invalid = false;
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
                invalid = true;
            }
        } while (invalid);
        do {
            try {
                System.out.print("Giá nhập: ");
                setImportPrice(Float.parseFloat(scanner.nextLine()));
                invalid = false;
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
                invalid = true;
            }
        } while (invalid);
        do {
            try {
                System.out.print("Giá bán: ");
                setExportPrice(Float.parseFloat(scanner.nextLine()));
                invalid = false;
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
                invalid = true;
            }
        } while (invalid);
        do {
            try {
                System.out.print("Tác giả: ");
                setAuthor(scanner.nextLine());
                invalid = false;
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
                invalid = true;
            }
        } while (invalid);
        do {
            try {
                System.out.print("Mô tả: ");
                setDescription(scanner.nextLine());
                invalid = false;
            } catch (Exception ex) {
                System.out.println(ex.getMessage());
                invalid = true;
            }
        } while (invalid);
        if (this.bookId == 0) {
            this.bookId = incrementId++;
        }
    }

    @Override
    public void displayData() {
        SimpleDateFormat fmt = new SimpleDateFormat("dd/MM/yyyy");
        System.out.println("Mã sách: " + this.bookId);
        System.out.println("Tên sách: " + this.bookName);
        System.out.println("Giá nhập: " + this.importPrice);
        System.out.println("Giá bán: " + this.exportPrice);
        System.out.println("Tác giả: " + this.author);
        System.out.println("Mô tả: " + this.description);
        System.out.println("Ngày tạo: " + fmt.format(this.created));
    }
}
