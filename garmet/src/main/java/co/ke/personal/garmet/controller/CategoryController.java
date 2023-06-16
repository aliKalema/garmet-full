package co.ke.personal.garmet.controller;

import co.ke.personal.garmet.model.Category;
import co.ke.personal.garmet.payload.CategoryHierarchy;
import co.ke.personal.garmet.service.CategoryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/v1/categories")
public record CategoryController(CategoryService categoryService) {

    @GetMapping
    public Page<Category> getAllCategories(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size,
                                           @RequestParam(required = false, name = "search_term") String searchTerm,
                                           @RequestParam( defaultValue = "NONE") CategoryHierarchy hierarchy ){
        Pageable pageable = PageRequest.of(page, size);
        if(hierarchy != null ){
            if(hierarchy.equals(CategoryHierarchy.LAST_NODE)){
                return categoryService.getAllChildrenCategories(pageable, searchTerm);
            }
            else if(hierarchy.equals(CategoryHierarchy.PARENT)){
                return categoryService.getAllParentCategories(pageable, searchTerm);
            }
        }
        return categoryService.getAll(pageable, searchTerm);
    }

    @GetMapping("/{ref_id}")
    public Category getCategoryById(@PathVariable("ref_id")String refId){
        return categoryService.getByRefId(refId);
    }


    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody  Category category){
        return new ResponseEntity<>(categoryService.createCategory(category), HttpStatus.CREATED);
    }

    @PutMapping("/{ref_id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("ref_id") String refId, @RequestBody Category category) {
        return new ResponseEntity<>(categoryService.updateCategory(refId, category),HttpStatus.OK);
    }

    @DeleteMapping("/{ref_id}")
    public void deleteCategory(@PathVariable("ref_id")String refId){
        categoryService.delete(refId);
    }

    @DeleteMapping("/parents/{parent_ref_id}/{ref_id}")
    public Category removeFromParent(@PathVariable("parent_ref_id")String parentRefId,
                                     @PathVariable("ref_id")String refId){
        return categoryService.removeFromParent(parentRefId, refId);
    }

}
