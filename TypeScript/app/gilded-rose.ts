export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items: Array<Item> = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const currentItem = this.items[i];

      if (!this.isAgedBrie(currentItem) && !this.isBackstagePass(currentItem)) {
        this.decreaseQuality(currentItem);
      } else {
        this.increaseQuality(currentItem);

        if (this.isBackstagePass(currentItem)) {
          if (currentItem.sellIn < 11) {
            this.increaseQuality(currentItem);
          }

          if (currentItem.sellIn < 6) {
            this.increaseQuality(currentItem);
          }
        }
      }

      if (!this.isSulfuras(currentItem)) {
        this.decreaseSellIn(currentItem);
      }

      if (currentItem.sellIn < 0) {
        if (!this.isAgedBrie(currentItem)) {
          if (!this.isBackstagePass(currentItem)) {
            this.decreaseQuality(currentItem);
          } else {
            currentItem.quality = 0;
          }
        } else {
          this.increaseQuality(currentItem);
        }
      }
    }

    return this.items;
  }

  isAgedBrie(item: Item): boolean {
    return item.name === 'Aged Brie';
  }

  isBackstagePass(item: Item): boolean {
    return item.name === 'Backstage passes to a TAFKAL80ETC concert';
  }

  isSulfuras(item: Item): boolean {
    return item.name === 'Sulfuras, Hand of Ragnaros';
  }

  decreaseQuality(item: Item) {
    if (item.quality > 0 && !this.isSulfuras(item)) {
      item.quality--;
    }
  }

  increaseQuality(item: Item) {
    if (item.quality < 50 && !this.isSulfuras(item)) {
      item.quality++;
    }
  }

  decreaseSellIn(item: Item) {
    if (!this.isSulfuras(item)) {
      item.sellIn--;
    }
  }
}
