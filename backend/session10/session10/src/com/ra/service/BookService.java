package com.ra.service;
import com.ra.entity.impl.Book;
import java.util.List;
import java.util.function.Predicate;
public interface BookService{
    List<Book> findAll();
    Book findId(int id);
    void add(Book book);
    void remove(int id);
    List<Book> sortByPrice();
    List<Book> findPriceBetween(float from, float to);
    List<Book> findByAuthor(String author);
    boolean findAny(Predicate<Book> predicate);
    void load();
    boolean save();
}

