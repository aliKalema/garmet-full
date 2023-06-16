package co.ke.personal.garmet.service;

import co.ke.personal.garmet.exception.type.Exceptions;
import co.ke.personal.garmet.model.Category;
import co.ke.personal.garmet.repository.CategoryRepository;
import co.ke.personal.garmet.repository.CategoryRepositoryImpl;
import co.ke.personal.garmet.utility.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Slf4j
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryRepositoryImpl categoryRepositoryImpl;
    @Autowired
    public CategoryService(CategoryRepository categoryRepository, CategoryRepositoryImpl categoryRepositoryImpl){
        this.categoryRepository = categoryRepository;
        this.categoryRepositoryImpl = categoryRepositoryImpl;
    }
    public Page<Category> getAllParentCategories(Pageable pageable, String searchTerm) {
        return StringUtils.isNotEmpty(searchTerm) ? categoryRepository.findAllParentsByName(pageable, searchTerm) : categoryRepository.findAllParents(pageable);
    }

    public Page<Category> getAllCategories(Pageable pageable, String searchTerm){
        return StringUtils.isNotEmpty(searchTerm) ? categoryRepository.findAllByName(pageable, searchTerm) :categoryRepository.findAll(pageable);
    }


    public Category createCategory(Category category) {
        Optional<Category> categoryOptional = categoryRepository.findByName(category.getName());
        if(categoryOptional.isPresent()){
            throw new Exceptions.CategoryExistException(category.getName());
        }
        String refId = StringUtils.generateRefId(16);
        while(categoryRepository.findByRefId(refId).isPresent()){
            refId = StringUtils.generateRefId(16);
        }
        category.setRefId(refId);
        if(StringUtils.isNotEmpty(category.getParentRefId())){
            Category parent = this.getByRefId(category.getParentRefId());
            category.setParent(parent);
            categoryRepository.save(category);
            parent.addChild(category);
            categoryRepository.save(parent);
        }
        else
            categoryRepository.save(category);
        return category;
    }

    @Transactional
    public Category updateCategory(String refId, Category category){
        Category original =  getByRefId(refId);
        original.update(category);
        return original;
    }

    public void delete(String refId){
        Category category = getByRefId(refId);
        categoryRepository.delete(category);
    }

    public Category getByRefId(String refId) {
        Optional<Category> categoryOptional = categoryRepository.findByRefId(refId);
        if(categoryOptional.isEmpty()){
            throw new Exceptions.CategoryNotFoundException(refId);
        }
        return categoryOptional.get();
    }

    public Optional<Category> exist(String refId){
        return categoryRepository.findByRefId(refId);
    }

    @Transactional
    public Category removeFromParent(String parentRefId, String refId) {
        Category parent = getByRefId(parentRefId);
        Category category = getByRefId(refId);
        category.setParent(null);
        return category;
    }

    public Page<Category> getAllChildrenCategories(Pageable pageable, String searchTerm) {
        return categoryRepositoryImpl.findAllLastChildren(searchTerm, pageable);
    }

    public Page<Category> getAll(Pageable pageable, String searchTerm) {
        return categoryRepositoryImpl.findAll(pageable, searchTerm);
    }
}
