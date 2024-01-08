package com.ra.service.Impl;
import com.ra.entity.impl.Book;
import com.ra.service.BookService;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;
public class BookServiceImpl implements BookService{
    private static List<Book> data = new ArrayList<>();

    @Override
    public List<Book> findAll() {
        return data;
    }

    @Override
    public Book findId(int id) {
        for (Book b : data) {
            if (b.getBookId() == id) {
                return b;
            }
            }
            return null;
    }

    @Override
    public void add(Book book) {
        data.add(book);
    }

    @Override
    public void remove(int id) {
        Book book = findId(id);
        if (book != null) {
            data.remove(book);
        }
        else
            System.out.println("Không tìm thấy sách có id=" + id);
    }

    @Override
    public List<Book> sortByPrice() {
        List<Book> sortedList = new ArrayList<>(data);
        sortedList.sort((b1,b2) -> Float.compare(b1.getExportPrice(), b2.getExportPrice()));
        return sortedList;
    }

    @Override
    public List<Book> findPriceBetween(float from, float to) {
        return data.stream()
                .filter(b -> b.getExportPrice() >= from && b.getExportPrice() <= to)
                .collect(Collectors.toList());
    }

    @Override
    public List<Book> findByAuthor(String author) {
        List<Book> result = new ArrayList<>();
        for (Book b : data) {
            if (b.getAuthor().contains(author)) {
                result.add(b);
            }
        }
        return result;
    }

    @Override
    public boolean findAny(Predicate<Book> predicate) {
        for (Book b : data) {
            if (predicate.test(b)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void load() {
        try {
            // B1: Tạo file
            File file = new File("book.txt");
            FileInputStream inputStream = new FileInputStream(file);
            ObjectInputStream ois = new ObjectInputStream(inputStream);
            data = (List<Book>) ois.readObject();
            ois.close();
            inputStream.close();
        } catch (Exception ex) {
            data = new ArrayList<>();
        }
    }

    @Override
    public boolean save() {
        try {
            File file = new File("book.txt");
            FileOutputStream fos = new FileOutputStream(file);
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(data);
            oos.flush();
            oos.close();
            fos.close();
            return true;
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
    }
}
