<div class="row g-3">
  <div class="col-12">
    <label class="form-label">Gift Name <span class="text-danger">*</span></label>
    <input type="text" class="form-control" name="name" required placeholder="e.g. Premium Executive Pen Set">
  </div>
  <div class="col-md-6">
    <label class="form-label">Category <span class="text-danger">*</span></label>
    <input type="text" class="form-control" name="category" required placeholder="e.g. Executive, Apparel, Outdoor, Mugs">
  </div>
  <div class="col-md-3">
    <label class="form-label">Stock Count <span class="text-danger">*</span></label>
    <input type="number" class="form-control" name="stock_count" value="10" min="0" required>
  </div>
  <div class="col-md-3">
    <label class="form-label">Cost (RM) <span class="text-danger">*</span></label>
    <input type="number" class="form-control" name="cost" value="0.00" step="0.01" min="0" required>
  </div>
  <div class="col-12">
    <label class="form-label">Description</label>
    <textarea class="form-control" name="description" rows="3" placeholder="Briefly describe the gift item..."></textarea>
  </div>
  <div class="col-12">
    <label class="form-label">Gift Image</label>
    <input type="file" class="form-control" name="image_file" accept="image/*">
    <small class="text-muted">Recommended: JPG, PNG, or WEBP images.</small>
  </div>
</div>
