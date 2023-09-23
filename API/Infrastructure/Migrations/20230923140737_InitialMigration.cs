using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "brands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    BrandName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_brands", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OrderCode = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OrderType = table.Column<int>(type: "int", nullable: false),
                    AssignedTo = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreationDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    AssignedDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    FinishedDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orders", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "productCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ProductsCategoryName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productCategories", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "shelves",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ShelfName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Face = table.Column<int>(type: "int", nullable: false),
                    Row = table.Column<int>(type: "int", nullable: false),
                    Column = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shelves", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "orderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ProductBarcode = table.Column<long>(type: "bigint", nullable: false),
                    CompletionDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    OrderFId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_orderItems_orders_OrderFId",
                        column: x => x.OrderFId,
                        principalTable: "orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Barcode = table.Column<long>(type: "bigint", nullable: false),
                    ProductName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Sex = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    BrandFId = table.Column<int>(type: "int", nullable: true),
                    ProductCategoryFId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_products_brands_BrandFId",
                        column: x => x.BrandFId,
                        principalTable: "brands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_products_productCategories_ProductCategoryFId",
                        column: x => x.ProductCategoryFId,
                        principalTable: "productCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "addresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AdressBarcode = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProductAmount = table.Column<int>(type: "int", nullable: false),
                    Row = table.Column<int>(type: "int", nullable: false),
                    Column = table.Column<int>(type: "int", nullable: false),
                    Face = table.Column<int>(type: "int", nullable: false),
                    ShelfFId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_addresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_addresses_shelves_ShelfFId",
                        column: x => x.ShelfFId,
                        principalTable: "shelves",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "productShelfDedications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Sex = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Face = table.Column<int>(type: "int", nullable: true),
                    Row = table.Column<int>(type: "int", nullable: true),
                    Column = table.Column<int>(type: "int", nullable: true),
                    ShelfFId = table.Column<int>(type: "int", nullable: false),
                    BrandFId = table.Column<int>(type: "int", nullable: false),
                    ProductCategoryFId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productShelfDedications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_productShelfDedications_brands_BrandFId",
                        column: x => x.BrandFId,
                        principalTable: "brands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_productShelfDedications_productCategories_ProductCategoryFId",
                        column: x => x.ProductCategoryFId,
                        principalTable: "productCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_productShelfDedications_shelves_ShelfFId",
                        column: x => x.ShelfFId,
                        principalTable: "shelves",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "productAddresings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    AddressedBy = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AddressedTime = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    AddressCode = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PickedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PickedTime = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ProductFId = table.Column<int>(type: "int", nullable: false),
                    AddressFId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_productAddresings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_productAddresings_addresses_AddressFId",
                        column: x => x.AddressFId,
                        principalTable: "addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_productAddresings_products_ProductFId",
                        column: x => x.ProductFId,
                        principalTable: "products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_addresses_ShelfFId",
                table: "addresses",
                column: "ShelfFId");

            migrationBuilder.CreateIndex(
                name: "IX_orderItems_OrderFId",
                table: "orderItems",
                column: "OrderFId");

            migrationBuilder.CreateIndex(
                name: "IX_productAddresings_AddressFId",
                table: "productAddresings",
                column: "AddressFId");

            migrationBuilder.CreateIndex(
                name: "IX_productAddresings_ProductFId",
                table: "productAddresings",
                column: "ProductFId");

            migrationBuilder.CreateIndex(
                name: "IX_products_BrandFId",
                table: "products",
                column: "BrandFId");

            migrationBuilder.CreateIndex(
                name: "IX_products_ProductCategoryFId",
                table: "products",
                column: "ProductCategoryFId");

            migrationBuilder.CreateIndex(
                name: "IX_productShelfDedications_BrandFId",
                table: "productShelfDedications",
                column: "BrandFId");

            migrationBuilder.CreateIndex(
                name: "IX_productShelfDedications_ProductCategoryFId",
                table: "productShelfDedications",
                column: "ProductCategoryFId");

            migrationBuilder.CreateIndex(
                name: "IX_productShelfDedications_ShelfFId",
                table: "productShelfDedications",
                column: "ShelfFId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "orderItems");

            migrationBuilder.DropTable(
                name: "productAddresings");

            migrationBuilder.DropTable(
                name: "productShelfDedications");

            migrationBuilder.DropTable(
                name: "orders");

            migrationBuilder.DropTable(
                name: "addresses");

            migrationBuilder.DropTable(
                name: "products");

            migrationBuilder.DropTable(
                name: "shelves");

            migrationBuilder.DropTable(
                name: "brands");

            migrationBuilder.DropTable(
                name: "productCategories");
        }
    }
}
